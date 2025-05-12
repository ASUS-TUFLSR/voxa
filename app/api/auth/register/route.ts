import { connectDB } from "@/lib/helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";


export const POST = async (req: Request) => {
    const { name, email, password } = await req.json();
    if(!name || !email || !password){
        return NextResponse.json({message: "Invalid Data"}, {status: 422});
    }
    try {
        await connectDB();
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.User.create({data: {email, name, password : hashedPassword}})
        return NextResponse.json({
            message: "User successfully created",
            ...user,
        },{
            status: 201
        })
        /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
        return NextResponse.json({
            message: "Server Error",
            ...err,
        },{status: 500});
        
    } finally {
        await prisma.$disconnect();
    }
};