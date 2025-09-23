import { getBlogById } from '@/lib/helpers';
import { BlogItemType } from '@/lib/types';
import Image from 'next/image';
import React from 'react';

const BlogsViewPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  // ✅ Await params before using
  const { id } = await params;
  const blog: BlogItemType = await getBlogById(id);

  return (
    <section
      className="w-full min-h-screen flex flex-col"
      style={{
        backgroundImage: `url('https://static.wixstatic.com/media/d19037_5a46916c0c674a99bd20b2f72fd10e8e~mv2.jpg/v1/fill/w_1024,h_813,al_c,q_85,enc_avif,quality_auto/d19037_5a46916c0c674a99bd20b2f72fd10e8e~mv2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Content Wrapper */}
      <div className="bg-white/90 backdrop-blur-sm flex-1 py-10 px-6 sm:px-10 md:px-20 lg:px-32">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 text-center mb-6">
          {blog.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-8">
          <span>📍 {blog.location}</span>
          <span>🗓 {new Date(blog.createdAt).toLocaleDateString()}</span>
          <span>📝 Category: {blog.categoryId}</span>
          <span>👤 Author: {blog.userId}</span>
        </div>

        {/* Blog Image */}
        <div className="w-full flex justify-center mb-8">
          <Image width={300} height={300}
            src={blog.imageUrl}
            alt={blog.title}
            className="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-auto rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Blog Content */}
        <article
  className="section max-w-3xl mx-auto text-gray-800"
  dangerouslySetInnerHTML={{ __html: blog.description }}
></article>

        {/* Updated Date */}
        <p className="text-center text-xs text-gray-500 mt-10">
          Last updated: {new Date(blog.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </section>
  );
};

export default BlogsViewPage;
