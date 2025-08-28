"use client";
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react'

const WriteBlog = () => {
  const { data: session } = useSession();
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-expect-error file input
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <section className="w-full py-10 px-6 bg-orange-200">
      {/* Header */}
      <div
        className="flex justify-between p-4 items-center"
        style={{
          backgroundImage: `url('https://static.wixstatic.com/media/d19037_a4a215b82b8c4063aaddf256b7a35653~mv2.jpg/v1/fill/w_1024,h_458,al_c,q_85,enc_avif,quality_auto/d19037_a4a215b82b8c4063aaddf256b7a35653~mv2.jpg')`,
          backgroundSize: "cover",
        }}
      >
        <div className="w-1/4">
          <span className="font-extrabold mx-3 text-white">Author:</span>
          <span className="font-semibold uppercase text-white">
            {session?.user?.name}
          </span>
        </div>
        <button className="bg-red-700 text-orange-200 px-6 focus:ring-red-900 py-3 rounded-xl 
            font-semibold shadow-xl hover:bg-red-800">
          Publish
        </button>
      </div>

      {/* Uploaded Image */}
      {imageUrl && (
        <div className="flex justify-center my-10">
          <Image
            src={imageUrl}
            alt="New Post"
            width={600}
            height={400}
            className="rounded-lg shadow-xl border-[3px] border-slate-100 
              max-w-[600px] max-h-[400px] w-auto h-auto object-contain"
          />
        </div>
      )}

      {/* Title */}
      <h1
        contentEditable
        suppressContentEditableWarning
        className="outline-none border-none font-serif mx-auto p-4 text-2xl 
       text-center font-bold text-red-900 w-full h-28"
      >
        Enter Title!
      </h1>

      {/* File Input */}
      <div className="w-full flex">
        <input
          onChange={handleImageChange}
          type="file"
          className="md:w-[500px] sm:w-[300px] m-auto text-red-900 bg-orange-100 p-4 rounded-xl font-semibold"
        />
      </div>
    </section>
  );
};

export default WriteBlog;
