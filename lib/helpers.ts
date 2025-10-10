/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/prisma";
import { NextResponse } from "next/server";

// ✅ Dynamic Base URL for local & production
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

/* --------------------------------------------------
   DATABASE CONNECTION
-------------------------------------------------- */
export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully.");
  } catch (err: any) {
    console.error("❌ Database connection failed:", err);
    throw new Error(err.message || "Failed to connect to database");
  }
};

// Automatically disconnect Prisma when hot reloading in dev
if (process.env.NODE_ENV !== "production") {
  process.once("SIGUSR2", async () => {
    await prisma.$disconnect();
  });
}

/* --------------------------------------------------
   STANDARDIZED API RESPONSES
-------------------------------------------------- */
type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};

export const generateSuccessMessage = <T>(
  data: T,
  status: number = 200
) => {
  return NextResponse.json<ApiResponse<T>>(
    { success: true, message: "Success", data },
    { status }
  );
};

export const generateErrorMessage = (error: any, status: number = 500) => {
  return NextResponse.json<ApiResponse<null>>(
    {
      success: false,
      message: "Error",
      error: error?.message || "Unknown error occurred",
    },
    { status }
  );
};

/* --------------------------------------------------
   GENERIC FETCH WRAPPER
-------------------------------------------------- */
const fetchData = async <T>(endpoint: string, cache: RequestCache = "no-store"): Promise<T> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, { cache });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Fetch failed (${res.status}): ${text || res.statusText}`);
  }

  const data = await res.json();
  return data?.data as T;
};

/* --------------------------------------------------
   API HELPERS
-------------------------------------------------- */
export const getAllBlogs = async (count?: number) => {
  const { blogs } = await fetchData<{ blogs: any[] }>("/api/blogs");
  return count ? blogs.slice(0, count) : blogs;
};

export const getBlogById = async (id: string) => {
  const { blog } = await fetchData<{ blog: any }>(`/api/blogs/${id}`);
  return blog;
};

export const getUserById = async (id: string) => {
  const user = await fetchData(`/api/users/${id}`);
  return user;
};

export const getAllCategories = async (count?: number) => {
  const { categories } = await fetchData<{ categories: any[] }>("/api/categories");
  return count ? categories.slice(0, count) : categories;
};

// Uncomment if needed later
// export const getCategoryById = async (id: string) => {
//   const { category } = await fetchData<{ category: any }>(`/api/categories/${id}`);
//   return category;
// };
