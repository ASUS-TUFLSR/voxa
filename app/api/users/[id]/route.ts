/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB, generateErrorMessage, generateSuccessMessage } from "@/lib/helpers";
import prisma from "@/prisma";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    // Connect to database
    await connectDB();

    // Fetch user and related data
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        _count: { select: { blogs: true } },
        blogs: true,
      },
    });

    // Handle user not found
    if (!user) {
      return generateErrorMessage("User not found", 404);
    }

    // Return success response
    return generateSuccessMessage(user, 200);
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return generateErrorMessage(error, 500);
  } finally {
    await prisma.$disconnect();
  }
};
