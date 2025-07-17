import { connectDB, generateErrorMessage, generateSuccessMessage } from "@/lib/helpers";
import prisma from "@/prisma";
import { v2, UploadApiResponse } from "cloudinary";

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload image
async function uploadImage(file: Blob): Promise<UploadApiResponse> {
  return new Promise(async (resolve, reject) => {
    const buffer = Buffer.from(await file.arrayBuffer());

    v2.uploader.upload_stream(
      { resource_type: "auto", folder: "nextjs-full-stack-blog" },
      (err, result) => {
        if (err) {
          console.error("Cloudinary upload error:", err);
          return reject(err);
        }
        if (result) return resolve(result);
      }
    ).end(buffer);
  });
}

// GET: Fetch all blogs
export const GET = async () => {
  try {
    await connectDB();
    const blogs = await prisma.blog.findMany();
    return generateSuccessMessage({ blogs }, 200);
  } catch (err) {
    return generateErrorMessage({ reason: "Failed to fetch blogs", error: err }, 500);
  } finally {
    await prisma.$disconnect();
  }
};

// POST: Create a new blog
export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const postData = JSON.parse(formData.get("postData") as string);

    const { title, description, location, categoryId, userId } = postData;

    // Validate required fields
    if (!title || !userId || !description || !categoryId || !location) {
      return generateErrorMessage({ reason: "Invalid Data" }, 422);
    }

    // Handle image upload
    const file = formData.get("image") as Blob | null;
    let uploadedFile: UploadApiResponse | null = null;
    if (file) {
      uploadedFile = await uploadImage(file);
    }

    // Validate user & category
    await connectDB();
    const user = await prisma.user.findFirst({ where: { id: userId } });
    const category = await prisma.category.findFirst({ where: { id: categoryId } });

    if (!user || !category) {
      return generateErrorMessage({ reason: "Invalid User or Category Id" }, 401);
    }

    // Create blog entry
    const blog = await prisma.blog.create({
      data: {
        title,
        description,
        location,
        categoryId,
        userId,
        imageUrl: uploadedFile?.secure_url ?? null,
      },
    });

    return generateSuccessMessage({ blog }, 201);
  } catch (error) {
    console.error("POST Error:", error);
    return generateErrorMessage({ reason: "Failed to create blog", error }, 501);
  } finally {
    await prisma.$disconnect();
  }
};
