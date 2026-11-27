import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const EXPECTED_SYSTEM_TYPES = [
  "snippet",
  "prompt",
  "command",
  "note",
  "file",
  "image",
  "link",
];

/** Thrown to roll back the write test so it leaves no rows behind. */
class RollbackSignal extends Error {}

let failures = 0;

function check(label: string, ok: boolean, detail: string) {
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}: ${detail}`);
}

async function testConnection() {
  console.log("\n--- Connection ---");

  if (!process.env.DATABASE_URL) {
    check("DATABASE_URL", false, "not set (is .env present?)");
    return;
  }

  const { hostname } = new URL(process.env.DATABASE_URL);
  console.log(`host: ${hostname}`);
  console.log(`pooled: ${hostname.includes("-pooler") ? "yes" : "no"}`);

  const rows = await prisma.$queryRaw<
    { db: string; usr: string; version: string }[]
  >`select current_database() as db, current_user as usr, version() as version`;

  const { db, usr, version } = rows[0];
  check("connected", true, `${db} as ${usr}`);
  console.log(`server: ${version.split(" on ")[0]}`);
}

async function testMigrations() {
  console.log("\n--- Migrations ---");

  const applied = await prisma.$queryRaw<
    { migration_name: string; finished_at: Date | null }[]
  >`select migration_name, finished_at from "_prisma_migrations" order by started_at`;

  check("migrations applied", applied.length > 0, `${applied.length} found`);

  for (const m of applied) {
    check(
      `  ${m.migration_name}`,
      m.finished_at !== null,
      m.finished_at ? "finished" : "INCOMPLETE — migration did not finish",
    );
  }
}

async function testSeed() {
  console.log("\n--- Seed ---");

  const systemTypes = await prisma.itemType.findMany({
    where: { isSystem: true },
    orderBy: { name: "asc" },
  });

  const names = systemTypes.map((t) => t.name);
  const missing = EXPECTED_SYSTEM_TYPES.filter((n) => !names.includes(n));

  check(
    "system item types",
    missing.length === 0,
    missing.length === 0
      ? `all ${EXPECTED_SYSTEM_TYPES.length} present`
      : `missing: ${missing.join(", ")} — run 'npx prisma db seed'`,
  );

  for (const type of systemTypes) {
    const validColor = /^#[0-9a-f]{6}$/i.test(type.color);
    check(`  ${type.name}`, validColor, `${type.icon} ${type.color}`);
  }
}

async function testCounts() {
  console.log("\n--- Row counts ---");

  const [users, items, collections, tags, itemTypes] = await Promise.all([
    prisma.user.count(),
    prisma.item.count(),
    prisma.collection.count(),
    prisma.tag.count(),
    prisma.itemType.count(),
  ]);

  console.log(
    `users: ${users}  items: ${items}  collections: ${collections}  ` +
      `tags: ${tags}  itemTypes: ${itemTypes}`,
  );
  check("all tables readable", true, "every model responded to count()");
}

/**
 * Exercises writes, relations and cascade deletes inside a transaction that is
 * always rolled back, so the dev database is left exactly as it was found.
 */
async function testWriteRoundTrip() {
  console.log("\n--- Write round-trip (rolled back) ---");

  const email = `test-db-${Date.now()}@example.invalid`;
  let createdUserId: string | null = null;

  try {
    await prisma.$transaction(async (tx) => {
      const snippetType = await tx.itemType.findFirst({
        where: { name: "snippet", isSystem: true },
      });

      if (!snippetType) {
        throw new Error("no 'snippet' system type — seed has not run");
      }

      const user = await tx.user.create({ data: { email, name: "Test DB" } });
      createdUserId = user.id;
      check("create user", true, user.id);

      const collection = await tx.collection.create({
        data: { name: "Test Collection", userId: user.id },
      });

      const item = await tx.item.create({
        data: {
          title: "Test snippet",
          contentType: "TEXT",
          content: "console.log('hi')",
          userId: user.id,
          itemTypeId: snippetType.id,
          collections: { create: { collectionId: collection.id } },
        },
      });
      check("create item + collection link", true, item.id);

      const loaded = await tx.item.findUniqueOrThrow({
        where: { id: item.id },
        include: { itemType: true, collections: { include: { collection: true } } },
      });
      check(
        "read back relations",
        loaded.itemType.name === "snippet" &&
          loaded.collections[0]?.collection.name === "Test Collection",
        `${loaded.itemType.name} in ${loaded.collections[0]?.collection.name}`,
      );

      await tx.user.delete({ where: { id: user.id } });
      const orphans = await tx.item.count({ where: { userId: user.id } });
      check("cascade delete items with user", orphans === 0, `${orphans} orphans`);

      throw new RollbackSignal();
    });
  } catch (error) {
    if (!(error instanceof RollbackSignal)) throw error;
  }

  const leftover = await prisma.user.count({ where: { email } });
  check("transaction rolled back", leftover === 0, `${leftover} rows left behind`);
  if (createdUserId === null) check("write test ran", false, "no user was created");
}

async function main() {
  console.log("Testing database connection and schema...");

  await testConnection();
  await testMigrations();
  await testSeed();
  await testCounts();
  await testWriteRoundTrip();

  console.log(
    failures === 0
      ? "\nAll checks passed."
      : `\n${failures} check(s) failed.`,
  );
  if (failures > 0) process.exitCode = 1;
}

main()
  .catch((error) => {
    console.error("\nDatabase test failed to run:");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
