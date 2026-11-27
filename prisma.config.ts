import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Migrations must run on the direct (unpooled) endpoint: PgBouncer breaks
    // the advisory locks and prepared statements prisma migrate relies on.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  },
});
