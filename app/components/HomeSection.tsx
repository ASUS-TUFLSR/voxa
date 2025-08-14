import React from 'react';
import Image from 'next/image';
import BlogItem from './BlogItem';
// import { getAllBlogs } from '@/lib/helpers';

const HomeSection = async () => {
  const blogs = [
    {
      id: "6879220d391a65c6d6ee75d8",
      title: "React Hooks and NextJS",
      description: "<p>React is a JavaScript library, and React even has a framework named NextJS.</p>",
      imageUrl: "https://res.cloudinary.com/dkevrnrw6/image/upload/v1752769034/nextjs-full-stack-blog/tmmx2mrcvws3lik3kcgf.jpg",
      userId: "6824347ea606e9a2eebdb2a1",
      createdAt: "2025-07-17T16:17:17.556Z",
      updatedAt: "2025-07-18T16:36:04.531Z",
      categoryId: "682ad898260c87a04ec81ca9",
      location: "Berlin"
    },
    {
      id: "6879220d391a65c6d6ee75d7",
      title: "React Hooks and NextJS",
      description: "<p>React is a JavaScript library, and React even has a framework named NextJS.</p>",
      imageUrl: "https://res.cloudinary.com/dkevrnrw6/image/upload/v1752769034/nextjs-full-stack-blog/tmmx2mrcvws3lik3kcgf.jpg",
      userId: "6824347ea606e9a2eebdb2a1",
      createdAt: "2025-07-17T16:17:17.556Z",
      updatedAt: "2025-07-18T16:36:04.531Z",
      categoryId: "682ad898260c87a04ec81ca9",
      location: "Berlin"
    },
    {
      id: "6879220d391a65c6d6ee75d6",
      title: "React Hooks and NextJS",
      description: "<p>React is a JavaScript library, and React even has a framework named NextJS.</p>",
      imageUrl: "https://res.cloudinary.com/dkevrnrw6/image/upload/v1752769034/nextjs-full-stack-blog/tmmx2mrcvws3lik3kcgf.jpg",
      userId: "6824347ea606e9a2eebdb2a1",
      createdAt: "2025-07-17T16:17:17.556Z",
      updatedAt: "2025-07-18T16:36:04.531Z",
      categoryId: "682ad898260c87a04ec81ca9",
      location: "Berlin"
    },
    {
      id: "6879220d391a65c6d6ee75d5",
      title: "React Hooks and NextJS",
      description: "<p>React is a JavaScript library, and React even has a framework named NextJS.</p>",
      imageUrl: "https://res.cloudinary.com/dkevrnrw6/image/upload/v1752769034/nextjs-full-stack-blog/tmmx2mrcvws3lik3kcgf.jpg",
      userId: "6824347ea606e9a2eebdb2a1",
      createdAt: "2025-07-17T16:17:17.556Z",
      updatedAt: "2025-07-18T16:36:04.531Z",
      categoryId: "682ad898260c87a04ec81ca9",
      location: "Berlin"
    },
    {
      id: "6879220d391a65c6d6ee75d4",
      title: "React Hooks and NextJS",
      description: "<p>React is a JavaScript library, and React even has a framework named NextJS.</p>",
      imageUrl: "https://res.cloudinary.com/dkevrnrw6/image/upload/v1752769034/nextjs-full-stack-blog/tmmx2mrcvws3lik3kcgf.jpg",
      userId: "6824347ea606e9a2eebdb2a1",
      createdAt: "2025-07-17T16:17:17.556Z",
      updatedAt: "2025-07-18T16:36:04.531Z",
      categoryId: "682ad898260c87a04ec81ca9",
      location: "Berlin"
    }
  ];

  // Helper to truncate descriptions
  const truncateText = (html: string, limit: number) => {
    const textOnly = html.replace(/<[^>]*>/g, ""); // strip HTML tags
    return textOnly.length > limit ? textOnly.substring(0, limit) + "..." : textOnly;
  };

  return (
    <section
      className="w-full py-10 px-6"
      style={{
        backgroundImage: `url('https://static.wixstatic.com/media/d19037_5a46916c0c674a99bd20b2f72fd10e8e~mv2.jpg/v1/fill/w_1024,h_813,al_c,q_85,enc_avif,quality_auto/d19037_5a46916c0c674a99bd20b2f72fd10e8e~mv2.jpg')`,
        backgroundSize: 'cover'
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 text-center md:text-left px-2">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-snug text-amber-200">
            Lets Learn and Grow Together
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-medium text-amber-100">
            Learn not only theoretically but by practically experiencing it.
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center px-2">
          <div className="w-3/4 sm:w-2/3 md:w-full max-w-xs sm:max-w-sm md:max-w-full">
            <Image
              priority
              className="w-full h-auto rounded-2xl shadow-xl"
              alt="Learning"
              width={600}
              height={400}
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72"
            />
          </div>
        </div>
      </div>

      <hr className="p-3 my-4" />
    
      <div className="flex flex-col justify-center items-center ">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-cyan-900">Recent Articles</h2>
        </div>
        <div className="flex flex-wrap w-full justify-center">
          {blogs.map((blog) => (
            <BlogItem
              key={blog.id}
              {...blog}
              description={truncateText(blog.description, 100)}
            />
          ))}

         </div>
      </div>
    </section>
  );
};

export default HomeSection;
