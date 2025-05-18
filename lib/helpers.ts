import prisma from "@/prisma"
import { NextResponse } from "next/server";

export const connectDB = async () => {
     try {
        await prisma.$connect();    
     } catch (err: any) {
        throw new Error(err);
     } 
}

export const generateErrorMessage = (data: any, status: number) => {
   return NextResponse.json({message: "Success", ...data}, {status, statusText:"OK"});
}

export const generateSuccessMessage = (data: any, status: number) => {
   return NextResponse.json({message: "Error", ...data}, {status, statusText: "ERROR"})
} 