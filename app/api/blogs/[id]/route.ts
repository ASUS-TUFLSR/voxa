import { connectDB, generateErrorMessage, generateSuccessMessage } from "@/lib/helpers"
import prisma from "@/prisma";

// GET blog by ID
export const GET = async (
  req: Request,
  context: { params: { id: string } }
) => {
  try {
    const { id } = await context.params; // ✅ Correct way
    await connectDB();

    const blog = await prisma.blog.findFirst({ where: { id } });
    return generateSuccessMessage({ blog }, 200);
  } catch (error) {
    return generateErrorMessage({ error }, 500);
  } finally {
    await prisma.$disconnect();
  }
};

// UPDATE blog
export const PUT = async (
  req: Request,
  context: { params: { id: string } }
) => {
  try {
    const { title, description } = await req.json();
    if (!title || !description)
      return generateErrorMessage({ reason: "Invalid Data" }, 422);

    const { id } = context.params; // ✅ Correct way
    await connectDB();

    const blog = await prisma.blog.update({
      where: { id },
      data: { title, description },
    });

    return generateSuccessMessage({ blog }, 200);
  } catch (error) {
    return generateErrorMessage({ error }, 500);
  } finally {
    await prisma.$disconnect();
  }
};

// DELETE blog
export const DELETE = async (
  req: Request,
  context: { params: { id: string } }
) => {
  try {
    const { id } = context.params; // ✅ Correct way
    await connectDB();

    const blog = await prisma.blog.delete({ where: { id } });
    return generateSuccessMessage({ blog }, 200);
  } catch (error) {
    return generateErrorMessage({ error }, 500);
  } finally {
    await prisma.$disconnect();
  }
};
