"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search as SearchIcon, Filter } from "lucide-react";
import BlogItem from "../components/BlogItem";
import { BlogItemType } from "@/lib/types";

const truncateText = (html: string, limit: number) => {
  const textOnly = html.replace(/<[^>]*>/g, "");
  return textOnly.length > limit ? textOnly.substring(0, limit) + "..." : textOnly;
};

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [blogs, setBlogs] = useState<BlogItemType[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch blogs from backend API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs", { cache: "no-store" });
        const data = await res.json();
        setBlogs(data?.data?.blogs || []);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // ✅ Extract unique categories efficiently
  const categories = useMemo(
    () => Array.from(new Set(blogs.map((b) => b.categoryId || "Uncategorized"))),
    [blogs]
  );

  // ✅ Filter blogs based on search + category
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory = selectedCategory
        ? blog.categoryId === selectedCategory
        : true;
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [blogs, searchQuery, selectedCategory]);

  // ✅ UI
  return (
    <section
      className="min-h-screen w-full bg-[url('/old-paper-bg.jpg')] bg-cover bg-fixed bg-center bg-no-repeat px-6 py-10 flex flex-col items-center"
      style={{
        backgroundBlendMode: "multiply",
        backgroundColor: "rgba(242, 228, 203, 0.95)",
      }}
    >
      <h2 className="text-4xl text-center font-extrabold text-amber-900 drop-shadow mb-8">
        Search From The Blogs 🕵️‍♂️
      </h2>

      {/* 🔍 Search + Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl justify-center items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search for blogs..."
            className="w-full py-3 px-5 pl-12 rounded-full shadow-md border border-amber-300 
                       focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 
                       bg-amber-50 text-amber-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon className="absolute left-4 top-3.5 text-amber-700" size={22} />
        </div>

        {/* Category Filter */}
        <div className="relative w-full md:w-1/3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full py-3 px-4 rounded-full shadow-md border border-amber-300 
                       bg-amber-50 focus:ring-2 focus:ring-amber-500 text-amber-900 appearance-none"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <Filter className="absolute right-4 top-3.5 text-amber-700" size={22} />
        </div>
      </div>

      {/* 📰 Blog Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-6xl">
        {loading ? (
          <p className="text-amber-800 text-center text-lg col-span-full">
            Fetching your blogs... ☕
          </p>
        ) : filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogItem
              key={blog.id}
              {...blog}
              description={truncateText(blog.description, 100)}
            />
          ))
        ) : (
          <p className="text-amber-800 text-center text-lg col-span-full">
            No blogs found matching your search 🔍
          </p>
        )}
      </div>
    </section>
  );
};

export default Search;
