import React from 'react';
import { categories } from '@/lib/utils';

const Blogspage = () => {

  return (
    <section
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-start p-8"
      style={{
        backgroundImage: `url('https://static.wixstatic.com/media/d19037_e1e20ec138914f03bd81393f1c31ec54~mv2.jpg')`,
      }}
    >
      {/* TEXT SECTION: Top-left */}
      <div className="flex flex-col gap-4 bg-black bg-opacity-40 text-red-200 p-6 rounded max-w-lg">
        <h1 className="text-4xl md:text-5xl font-serif drop-shadow-lg">
          Explore Articles On Various Categories...
        </h1>
        <p className="text-lg md:text-xl drop-shadow-md">
          Discover deep insights, engaging stories, and thought-provoking ideas across multiple topics...
        </p>
      </div>

      {/* NAV / FILTER: naturally below text */}
     <nav className="bg-red-100 border w-full flex flex-col md:flex-row gap-4 h-auto p-4 rounded mt-6">
  <div className="flex flex-col md:flex-row items-start md:items-center w-full md:justify-between gap-4">
    
    {/* Filter Label + Select */}
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
      <p className="font-semibold text-lg md:text-2xl">Filter</p>
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
        className="px-3 py-2 rounded border border-gray-300 w-full md:w-full"
      />
      
    </div>

  </div>
</nav>


    </section>
  );
};

export default Blogspage;
