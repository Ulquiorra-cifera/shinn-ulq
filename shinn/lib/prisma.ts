// Server-only Prisma client singleton — this is the ONE connection point to
// the ONE database. Never import this file from client components; database
// credentials must never reach the browser (architecture rule 16).
import "server-only";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

// Prevent hot-reload in dev from spawning a new client (and new connection
// pool) on every file change.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
