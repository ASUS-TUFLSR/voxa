// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { PrismaClient } from "@prisma/client/extension";

let prisma: PrismaClient;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface Global {
            prisma: PrismaClient;
        }
    }
}

if (process.env.NODE_ENV === "production"){
    prisma = new PrismaClient();
} else {
    if(!global.prisma){
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;