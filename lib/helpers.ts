import prisma from "@/prisma"
import { NextResponse } from "next/server";

export const connectDB = async () => {
     try {
        await prisma.$connect();    
     } catch (err: any) {
        throw new Error(err);
     } 
}

type ApiResponse<T> = {
   success: boolean;
   message: string;
   data?: T;
   error?: any;
 };
 
 export const generateSuccessMessage = <T>(data: T, status: number = 200) => {
   const response: ApiResponse<T> = {
     success: true,
     message: "Success",
     data,
   };
 
   return NextResponse.json(response, { status });
 };
 
 export const generateErrorMessage = (error: any, status: number = 500) => {
   const response: ApiResponse<null> = {
     success: false,
     message: "Error",
     error: error?.message || error || "Unknown error",
   };
 
   return NextResponse.json(response, { status });
 };