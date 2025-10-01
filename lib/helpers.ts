import prisma from "@/prisma"
import { NextResponse } from "next/server";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; TO DO

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

export const getAllBlogs = async (count?: number) => {
  const res = await fetch("http://localhost:3000/api/blogs");

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data = await res.json();
  const blogs = data?.data?.blogs ?? [];
  return count ? blogs.slice(0, count) : blogs;


};

export const getBlogById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  const data = await res.json();
  return data.data.blog; 

};

export const getUserById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/users/${id}`, {
    next:{revalidate:100}
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  const data = await res.json();
  return data.data;

};

export const getAllCategories = async (count?: number) => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();
  const categories = data?.data?.categories ?? [];
  return count ? categories.slice(0, count) : categories;


};

// export const getCategoryById = async (id: string) => {
//   const res = await fetch(`http://localhost:3000/api/categories/${id}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch blog");
//   }

//   const data = await res.json();
//   return data.data.categories;

// };
