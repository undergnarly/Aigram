import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const adapter = new PrismaBetterSqlite3({
  url: `file:${path.join(process.cwd(), "dev.db")}`,
});

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter, log: ["error"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
