import { PrismaClient } from '@prisma/client';
declare const prismaClientSingleton: () => PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}
export declare const prisma: PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export {};
