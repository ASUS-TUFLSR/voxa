import { connectDB, generateErrorMessage, generateSuccessMessage } from "@/lib/helpers"
import prisma from "@/prisma";

export const GET = async () => {
    try {
        await connectDB();
        const categories = await prisma.category.findMany();
        return generateSuccessMessage({ categories }, 200);
    } catch (err) {
        return generateErrorMessage({ err }, 500);
    } finally {
        await prisma.$disconnect();
    }
};


export const POST = async (req: Request) => {
    try {
        const { name } = await req.json();
        await connectDB();
        const category = await prisma.category.create({ data: { name } });
        return generateSuccessMessage({ category }, 200);
    } catch (err) {
        return generateErrorMessage({ err }, 500);
    } finally {
        await prisma.$disconnect();
    }
};

