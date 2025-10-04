/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";
import BlogEditor from "../../../components/BlogEditor";
import { BlogItemType } from "@/lib/types";
import { useRouter } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const getBlogById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.data.blog;
};

const EditPage = ({ params }: Props) => {
  const resParams = React.use(params);
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // plain HTML string

  useEffect(() => {
    getBlogById(resParams?.id ?? "")
      .then((data: BlogItemType) => {
        setTitle(data.title);
        setDescription(data.description); // Syncfusion takes HTML directly
      })
      .catch((err) => console.error(err));
  }, [resParams?.id]);

  const handlePublish = async () => {
    const postData = JSON.stringify({
      title,
      description, // ✅ only send what backend expects
    });

    try {
      toast.loading("Updating blog ✍️", { id: "postData" });
      const res = await fetch(`http://localhost:3000/api/blogs/${resParams?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: postData,
      });

      if (!res.ok) throw new Error("Failed to update");

      toast.success("Blog updated 🎉", { id: "postData" });
      
      // ✅ Redirect to profile after success
      router.push("/profile");
      router.refresh(); // ensures fresh data
    } catch (error) {
      toast.error("Failed to update", { id: "postData" });
      console.error(error);
    }
  };

  return (
    <section className="w-full py-10 px-6 bg-orange-200">
      <Toaster position="top-right" />

      {/* Header */}
      <div
        className="flex justify-between p-4 items-center"
        style={{
          backgroundImage: `url('https://static.wixstatic.com/media/d19037_a4a215b82b8c4063aaddf256b7a35653~mv2.jpg')`,
          backgroundSize: "cover",
        }}
      >
        <div className="w-1/4">
          <span className="font-extrabold mx-3 text-white">Author:</span>
          <span className="font-semibold uppercase text-white">
            {session?.user?.name ?? "Guest"}
          </span>
        </div>
        <button
          onClick={handlePublish}
          className="bg-red-700 text-orange-200 px-6 focus:ring-red-900 py-3 rounded-xl 
            font-semibold shadow-xl hover:bg-red-800"
        >
          Update Blog
        </button>
      </div>

      {/* Title Input */}
      <div className="w-full flex my-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title!"
          className="outline-none border-none font-serif mx-auto p-4 text-2xl 
            text-center font-bold text-red-900 w-full h-28"
        />
      </div>

      {/* Rich Text Editor */}
      <BlogEditor value={description} onChange={setDescription} />
    </section>
  );
};

export default EditPage;
