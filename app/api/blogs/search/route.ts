import { connectDB, generateErrorMessage, generateSuccessMessage } from "@/lib/helpers"
import prisma from "@/prisma";

// Getting query data from the url 

export const GET = async (req: Request) => {
    const searchedTitle = new URL(req.url).searchParams.get("title")
    try {
        await connectDB();
        const blogs = await prisma.blog.findMany({ where:{ title:{ contains: searchedTitle ?? ""}}});
        return generateSuccessMessage({ blogs }, 200);
    } catch (err) {
        return generateErrorMessage({ err }, 500);
    } finally {
        await prisma.$disconnect();
    }
};
