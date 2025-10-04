// app/blogs/view/[id]/page.tsx
import { getBlogById } from "@/lib/helpers";
import { BlogItemType } from "@/lib/types";
import Image from "next/image";
import React from "react";
import DOMPurify from "isomorphic-dompurify";

const BlogsViewPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog: BlogItemType = await getBlogById(id);

  // sanitize incoming HTML (important)
  const cleanHtml = DOMPurify.sanitize(blog.description ?? "", {
    USE_PROFILES: { html: true },
  });

  return (
    <section
      className="w-full min-h-screen flex flex-col items-center"
      style={{
        backgroundImage:
          "url('https://static.wixstatic.com/media/d19037_5a46916c0c674a99bd20b2f72fd10e8e~mv2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Center card with translucent backdrop */}
      <div className="relative z-10 w-full max-w-5xl mx-auto py-12 px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-10 md:px-12 md:py-14">
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 text-center mb-6">
              {blog.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600 mb-6">
              <span aria-label="location">📍 {blog.location}</span>
              <span aria-label="date">🗓 {new Date(blog.createdAt).toLocaleDateString()}</span>
              <span aria-label="category">📝 Category: {blog.categoryId}</span>
              <span aria-label="author">👤 Author: {blog.userId}</span>
            </div>

            {/* Featured image (responsive) */}
            {blog.imageUrl && (
              <div className="w-full flex justify-center mb-8">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  width={700}
                  height={300}
                  className="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-auto rounded-xl shadow-lg object-cover"
                />
              </div>
            )}

            {/* Article content */}
            <article
              className="content prose prose-lg max-w-3xl mx-auto text-gray-800"
              // sanitized HTML
              dangerouslySetInnerHTML={{ __html: cleanHtml }}
            ></article>

            {/* Updated date */}
            <p className="text-center text-xs text-gray-500 mt-10">
              Last updated: {new Date(blog.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsViewPage;
