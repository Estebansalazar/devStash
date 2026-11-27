import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { BCRYPT_ROUNDS, DEMO_USER, SEED_COLLECTIONS } from "./seed-data";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const SYSTEM_ITEM_TYPES = [
  { name: "snippet", icon: "Code", color: "#3b82f6" },
  { name: "prompt", icon: "Sparkles", color: "#8b5cf6" },
  { name: "command", icon: "Terminal", color: "#f97316" },
  { name: "note", icon: "StickyNote", color: "#fde047" },
  { name: "file", icon: "File", color: "#6b7280" },
  { name: "image", icon: "Image", color: "#ec4899" },
  { name: "link", icon: "Link", color: "#10b981" },
];

async function main() {
  console.log("Seeding system item types...");

  for (const type of SYSTEM_ITEM_TYPES) {
    const existing = await prisma.itemType.findFirst({
      where: { name: type.name, userId: null },
    });

    if (existing) {
      await prisma.itemType.update({
        where: { id: existing.id },
        data: { icon: type.icon, color: type.color, isSystem: true },
      });
    } else {
      await prisma.itemType.create({ data: { ...type, isSystem: true } });
    }
  }

  console.log(`Seeded ${SYSTEM_ITEM_TYPES.length} system item types.`);

  const userId = await seedDemoUser();
  await seedCollections(userId);
}

async function seedDemoUser() {
  console.log("Seeding demo user...");

  const password = await bcrypt.hash(DEMO_USER.password, BCRYPT_ROUNDS);
  const data = { name: DEMO_USER.name, password, isPro: false, emailVerified: new Date() };

  const user = await prisma.user.upsert({
    where: { email: DEMO_USER.email },
    update: data,
    create: { email: DEMO_USER.email, ...data },
  });

  console.log(`Seeded demo user ${user.email}.`);
  return user.id;
}

async function seedCollections(userId: string) {
  console.log("Seeding collections and items...");

  // Demo data is recreated on every run so the seed stays idempotent.
  await prisma.item.deleteMany({ where: { userId } });
  await prisma.collection.deleteMany({ where: { userId } });

  const systemTypes = await prisma.itemType.findMany({ where: { isSystem: true, userId: null } });
  const typeIds = new Map(systemTypes.map((type) => [type.name, type.id]));

  let itemCount = 0;
  for (const collection of SEED_COLLECTIONS) {
    const created = await prisma.collection.create({
      data: { name: collection.name, description: collection.description, userId },
    });

    for (const { type, ...item } of collection.items) {
      const itemTypeId = typeIds.get(type);
      if (!itemTypeId) throw new Error(`System item type "${type}" not found`);

      await prisma.item.create({
        data: { ...item, userId, itemTypeId, collections: { create: { collectionId: created.id } } },
      });
      itemCount++;
    }
  }

  console.log(`Seeded ${SEED_COLLECTIONS.length} collections and ${itemCount} items.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
