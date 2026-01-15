"use client";

import React, { useMemo, useState } from "react";
import BlogItem from "../components/BlogItem";
import { Search as SearchIcon, Filter } from "lucide-react";
import { BlogItemType } from "@/lib/types";

type Category = {
  id: string;
  name: string;
};

type Props = {
  blogs: BlogItemType[];
  categories: Category[];
};

const SearchClient = ({ blogs, categories }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // 🔥 Build category map once
  const categoryMap = useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach((c) => (map[c.id] = c.name));
    return map;
  }, [categories]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const categoryName = categoryMap[blog.categoryId] || "Uncategorized";

      const matchesCategory = selectedCategory
        ? categoryName === selectedCategory
        : true;

      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [blogs, searchQuery, selectedCategory, categoryMap]);

  return (
    <section  className="min-h-screen w-full bg-cover bg-fixed bg-center bg-no-repeat px-6 py-10 flex flex-col items-center"
      style={{
        backgroundBlendMode: "multiply",
        backgroundImage: `url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMjBfYV9wYXBlcl90ZXh0dXJlX29mX3NjcmliYmxlX3N0cm9rZV9zaW1wbGVfYW5kX181Mjg2OWM4YS02NGViLTQ2M2EtYmUzMC1hNDY2Zjc2Mjc5YTFfMS5qcGc.jpg')`,
      }}>
      <h2 className="text-4xl text-center font-extrabold text-amber-900 drop-shadow mb-8">
       Search From The Blogs 🕵️‍♂️
      </h2>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl justify-center items-center">
        <div className="relative w-full md:w-2/3">
          <SearchIcon className="absolute left-4 top-3.5 text-amber-700" />
          <input
            className="w-full py-3 px-5 pl-12 rounded-full shadow-md border border-amber-300 
                       focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 
                       bg-amber-50 text-amber-900"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="relative w-full md:w-1/3">
          <Filter className="absolute right-4 top-3.5 text-amber-700" />
          <select
            className="w-full py-3 px-4 rounded-full shadow-md border border-amber-300 
                       bg-amber-50 focus:ring-2 focus:ring-amber-500 text-amber-900 appearance-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Blogs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
        {filteredBlogs.map((blog) => (
          <BlogItem
            key={blog.id}
            {...blog}
            categoryName={categoryMap[blog.categoryId]}
          />
        ))}
      </div>
    </section>
  );
};

export default SearchClient;
