"use client";

import React, { useState, useMemo } from "react";
import BlogItem from "../components/BlogItem";
import { BlogItemType, Category } from "@/lib/types";

const BlogList = ({ blogs, categories }: { blogs: BlogItemType[]; categories: Category[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const truncateText = (html: string, limit: number) => {
    const textOnly = html.replace(/<[^>]*>/g, "");
    return textOnly.length > limit ? textOnly.substring(0, limit) + "..." : textOnly;
  };

  // ✅ Filter blogs based on search + category
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory = selectedCategory ? blog.categoryId === selectedCategory : true;
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [blogs, searchQuery, selectedCategory]);

  return (
    <>
      <nav className="bg-red-100 border w-full flex flex-col sm:sticky z-50 top-0 gap-4 p-4 rounded mt-6">
        <div className="flex flex-col md:flex-row items-start md:items-center w-full md:justify-between gap-4">
          {/* Category Filter */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
            <p className="font-semibold text-lg md:text-xl">Filter</p>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded border border-red-300 w-full md:w-48 bg-red-100"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex flex-col w-full md:flex-1">
            <label htmlFor="search" className="sr-only">Search</label>
            <input
              type="text"
              id="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 rounded border border-gray-300 w-full"
            />
          </div>
        </div>
      </nav>

      {/* Blog List */}
      <div className="flex flex-col justify-center items-center ">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-red-900">Recent Articles</h2>
        </div>
        <div className="flex flex-wrap w-full justify-center my-1">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogItem
                key={blog.id}
                {...blog}
                description={truncateText(blog.description, 100)}
              />
            ))
          ) : (
            <p className="text-gray-600">No blogs found 🚫</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogList;
