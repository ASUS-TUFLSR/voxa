import { connectDB, generateErrorMessage, generateSuccessMessage } from "@/lib/helpers"
import prisma from "@/prisma";

export const GET = async () => {
    try {
        await connectDB();
        const blogs = await prisma.blog.findMany();
        return generateSuccessMessage({ blogs }, 200);
    } catch (err) {
        return generateErrorMessage({ err }, 500);
    } finally {
        await prisma.$disconnect();
    }
};

export const POST = async (req: Request) => {
    
}