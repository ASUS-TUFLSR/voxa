"use client";

import React, { useState, useMemo } from "react";
import BlogItem from "../components/BlogItem";
import { BlogItemType, Category } from "@/lib/types";

interface BlogListProps {
  blogs: BlogItemType[];
  categories: Category[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs, categories }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // 🔹 Utility to strip HTML & truncate text
  const truncateText = (html: string, limit: number) => {
    const textOnly = html.replace(/<[^>]*>/g, "");
    return textOnly.length > limit ? textOnly.substring(0, limit) + "..." : textOnly;
  };

  // 🔹 Filter blogs efficiently with useMemo
  const filteredBlogs = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return blogs.filter((blog) => {
      const matchesCategory = selectedCategory ? blog.categoryId === selectedCategory : true;
      const matchesSearch =
        blog.title.toLowerCase().includes(query) ||
        blog.description.toLowerCase().includes(query) ||
        blog.location.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [blogs, searchQuery, selectedCategory]);

  return (
    <>
      {/* 🔹 Filter & Search Bar */}
      <nav className="bg-white border border-red-200 shadow-md rounded-xl sticky top-0 z-50 w-full p-4 sm:p-6 mt-6">
  <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
    {/* Filter Section */}
    <div className="flex items-center gap-3 w-full md:w-auto">
      <label
        htmlFor="category"
        className="font-semibold text-red-700 text-base whitespace-nowrap"
      >
        Category:
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="px-4 py-2 rounded-lg border border-red-300 bg-red-50 text-red-900 
                   hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400 
                   transition-all duration-200"
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>

    {/* Search Section */}
    <div className="relative w-full md:w-1/2">
      <input
        id="search"
        type="text"
        placeholder="Search articles..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-5 py-2.5 pl-10 rounded-lg border border-gray-300 
                   bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400 
                   focus:border-transparent text-gray-800 placeholder-gray-500
                   shadow-sm transition-all duration-200"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M9.5 17A7.5 7.5 0 109.5 2a7.5 7.5 0 000 15z"
        />
      </svg>
    </div>
  </div>
</nav>


      {/* 🔹 Blog Grid */}
      <section className="flex flex-col justify-center items-center py-8">
        <h2 className="text-2xl font-semibold text-red-900 mb-6">Recent Articles</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 w-full max-w-7xl">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogItem
                key={blog.id}
                {...blog}
                description={truncateText(blog.description, 100)}
              />
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              No blogs found 🚫
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogList;
