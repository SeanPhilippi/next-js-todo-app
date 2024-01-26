import { PrismaClient } from "@prisma/client";

// assign global to globalForPrisma and type it so TS knows it has a prisma property that can be a PrismaClient instance or undefined
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// assign prisma the globalForPrisma.prisma PrismaClient instance that exists or create a new one, and export it
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

// only do this when not in production
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
