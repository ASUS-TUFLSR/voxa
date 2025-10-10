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
      <nav className="bg-red-100 border w-full flex flex-col sm:sticky top-0 z-50 gap-4 p-4 rounded-lg mt-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
          {/* Category Filter */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
            <label htmlFor="category" className="font-semibold text-lg text-red-900">
              Filter:
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-md border border-red-300 bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="flex flex-col w-full md:w-1/2">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
            />
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
