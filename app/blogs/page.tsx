import React from 'react';
import { categories, blogs } from '@/lib/utils';
import BlogItem from '../components/BlogItem';

const Blogspage = () => {
  const truncateText = (html: string, limit: number) => {
    const textOnly = html.replace(/<[^>]*>/g, ""); // strip HTML tags
    return textOnly.length > limit ? textOnly.substring(0, limit) + "..." : textOnly;
  };

  return (
    <section
      className="w-full py-10 px-6"
      style={{
        backgroundImage: `url('https://static.wixstatic.com/media/d19037_e1e20ec138914f03bd81393f1c31ec54~mv2.jpg')`,
        backgroundSize: 'cover'
      }}
    >
      {/* TEXT SECTION: Top-left */}
      <div className="flex flex-col gap-4 bg-black bg-opacity-40 text-red-200 p-4 md:p-6 rounded max-w-full md:max-w-lg">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif drop-shadow-lg">
          Explore Articles On Various Categories...
        </h1>
        <p className="text-base md:text-lg lg:text-xl drop-shadow-md">
          Discover deep insights, engaging stories, and thought-provoking ideas across multiple topics...
        </p>
      </div>

      {/* NAV / FILTER: naturally below text */}
      <nav className="bg-red-100 border w-full flex flex-col  sm:sticky z-50 top-0 gap-4 p-4 rounded mt-6">
        <div className="flex flex-col md:flex-row items-start md:items-center w-full md:justify-between gap-4">
          
          {/* Filter Label + Select */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
            <p className="font-semibold text-lg md:text-xl">Filter</p>
            <select
              name="category"
              id="select"
              className="px-3 py-2 rounded border border-red-300 w-full md:w-48 bg-red-100"
            >
              {categories.map((category) => (
                <option
                  className="rounded-md bg-red-100"
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input: Wider */}
          <div className="flex flex-col w-full md:flex-1">
            <label htmlFor="search" className="sr-only">Search</label>
            <input
              type="text"
              id="search"
              placeholder="Search articles..."
              className="px-3 py-2 rounded border border-gray-300 w-full"
            />
          </div>
        </div>
      </nav>
      
     <div className="flex flex-col justify-center items-center ">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-red-900">Recent Articles</h2>
        </div>
        <div className="flex flex-wrap w-full justify-center my-1">
          {blogs.map((blog) => (
            <BlogItem
              key={blog.id}
              {...blog}
              description={truncateText(blog.description, 100)}
            />
          ))}

         </div>

         <div className='w-full p-4 lg:text-center' >
            <button className="mx-auto sm:w-lg w-lg  border-2 border-red-700 p-1 rounded-sm text-amber-100 bg-red-700 hover:bg-red-800 hover:text-amber-200 duration-500">
        Write Blogs
      </button>
         </div>
      </div>
    </section>
  );
};

export default Blogspage;