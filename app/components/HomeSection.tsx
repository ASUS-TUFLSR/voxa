import React from 'react';
import Image from 'next/image';
import BlogItem from './BlogItem';
import { getAllBlogs } from '@/lib/helpers';
import { BlogItemType } from '@/lib/types';
import Link from 'next/link';

const HomeSection = async () => {
  const blogs = await getAllBlogs();

  const truncateText = (html: string, limit: number) => {
    const textOnly = html.replace(/<[^>]*>/g, ""); 
    return textOnly.length > limit ? textOnly.substring(0, limit) + "..." : textOnly;
  };

  return (
    <section
      className="w-full py-16 px-6 relative"
      style={{
        backgroundImage: `url('https://static.wixstatic.com/media/d19037_5a46916c0c674a99bd20b2f72fd10e8e~mv2.jpg/v1/fill/w_1024,h_813,al_c,q_85,enc_avif,quality_auto/d19037_5a46916c0c674a99bd20b2f72fd10e8e~mv2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-amber-50/70 backdrop-blur-[2px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 text-center md:text-left px-2">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold leading-snug text-red-900">
            Let’s Learn and Grow Together
          </h1>
          <p className="font-serif text-base sm:text-lg md:text-xl font-medium text-red-900">
            Learn not only theoretically but by practically experiencing it.
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center px-2">
          <div className="w-3/4 sm:w-2/3 md:w-full max-w-xs sm:max-w-sm md:max-w-md">
            <Image
              priority
              className="w-full h-auto rounded-2xl shadow-2xl"
              alt="Learning"
              width={600}
              height={400}
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72"
            />
          </div>
        </div>
      </div>

      {/* Recent Articles */}
      <div className="relative z-10 mt-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-red-900">📖 Recent Articles</h2>
          <p className="text-gray-700 mt-2">Stay updated with our latest blogs</p>
        </div>

        {/* Grid for Blog Items */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4">
          {blogs.map((blog: BlogItemType) => (
            <BlogItem
              key={blog.id}
              {...blog}
              description={truncateText(blog.description, 100)}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="w-full text-center mt-10">
          <Link
                href={`/blogs`}
                prefetch
                className="px-6 py-2 rounded-md font-medium
                             border-2 border-red-700 bg-red-700 text-amber-50
                             hover:bg-red-800 hover:border-red-800 hover:scale-105
                             transition-all duration-300 shadow-md"
              >
                Explore More Articles →
              </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
