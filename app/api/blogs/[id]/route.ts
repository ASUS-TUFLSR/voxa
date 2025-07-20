import { connectDB, generateErrorMessage, generateSuccessMessage } from "@/lib/helpers"
import prisma from "@/prisma";


// Getting the blogs from mongoDB
export const GET = async ( req: Request ,{ params }: { params: { id: string }}) => {
    try {
        const id = params.id;
        await connectDB();
        const blog = await prisma.blog.findFirst({where: {id}});
        return generateSuccessMessage({blog}, 200);
    } catch (error) {
        generateErrorMessage({error}, 500);
    } finally {
        await prisma.$disconnect();
    }  
};

// Updating the blog
export const PUT = async ( req: Request ,{ params }: { params: { id: string }}) => {
    try {
        const { title, description } =  await req.json();
        if(!title || !description) return generateErrorMessage({reason: "Invalid Data"}, 422)
        const id = params.id;
        await connectDB();
        const blog = await prisma.blog.update({where: {id}, data:{title, description}});
        return generateSuccessMessage({blog}, 200);
    } catch (error) {
        generateErrorMessage({error}, 500);
    } finally {
        await prisma.$disconnect();
    }  
};


// Deleting the blog ny ID
export const DELETE = async ( req: Request ,{ params }: { params: { id: string }}) => {
    try {
        const id = params.id;
        await connectDB();
        const blog = await prisma.blog.delete({where: {id}});
        return generateSuccessMessage({blog}, 200);
    } catch (error) {
        generateErrorMessage({error}, 500);
    } finally {
        await prisma.$disconnect();
    }  
};