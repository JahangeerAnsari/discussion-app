import { PrismaClient } from "@prisma/client";
// here we are making sure that we are not using prisma Client multiple times
// prevent the hot re
declare global {
  var prisma: PrismaClient | undefined;
}
export const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_EN !== "production") {
  globalThis.prisma = db;
}
