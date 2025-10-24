/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/prisma";
import { connectDB, generateErrorMessage, generateSuccessMessage } from "@/lib/helpers";

export const GET = async (
  req: Request,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await context.params; // ✅ await params
    await connectDB();

    // ✅ Detect if it's a valid Mongo ObjectId (24-char hex)
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

    let user;

    if (isObjectId) {
      user = await prisma.user.findUnique({ 
        where: { id },include: { blogs: true, _count: { select: { blogs: true } } } },);
      
    } else {
      // ✅ Fallback to email-based lookup (for OAuth users)
      user = await prisma.user.findUnique({ where: { email: id } });
    }

    if (!user) {
      return generateErrorMessage({ message: "User not found" }, 404);
    }

    return generateSuccessMessage(user);
  } catch (err: any) {
    console.error("Error fetching user:", err);
    return generateErrorMessage(err);
  }
};
