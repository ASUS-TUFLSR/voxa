import { connectDB } from "@/lib/helpers"
import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectDB();
        const users = await prisma.user.findMany();
        return NextResponse.json({message: "Success", users}, {status: 200});
    } catch (err) {
        NextResponse.json({message: "Error", err}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }  
};