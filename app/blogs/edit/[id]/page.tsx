/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, use } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { Toaster, toast } from "react-hot-toast";
import BlogEditor from "../../../components/BlogEditor";
import { BlogItemType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

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
  const { user } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!resParams?.id) return;

    getBlogById(resParams.id)
      .then((data: BlogItemType) => {
        setTitle(data.title);
        setDescription(data.description);
      })
      .catch(() => toast.error("Failed to load blog data"))
      .finally(() => setLoading(false));
  }, [resParams?.id]);

  const updateBlog = async () => {
    try {
      toast.loading("Updating blog ✍️", { id: "postData" });
      const res = await fetch(`/api/blogs/${resParams?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) throw new Error("Failed to update");

      toast.success("Blog updated 🎉", { id: "postData" });
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("Failed to update", { id: "postData" });
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
            {user?.name ?? "Guest"}
          </span>
        </div>
        <button
          onClick={updateBlog}
          className="bg-red-700 text-orange-200 px-6 focus:ring-red-900 py-3 rounded-xl 
            font-semibold shadow-xl hover:bg-red-800"
        >
          Update Blog
        </button>
      </div>

      {/* Title Input / Skeleton */}
      <div className="w-full flex my-5 justify-center items-center">
  {loading ? (
    <Skeleton className="h-14 w-xl rounded-md" />
  ) : (
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Enter Title!"
      className="outline-none border-none font-serif mx-auto p-4 text-2xl 
        text-center font-bold text-red-900 w-full h-28 bg-transparent"
    />
  )}
</div>


      {/* Rich Text Editor */}
      <BlogEditor value={description} onChange={setDescription} />
    </section>
  );
};

export default EditPage;
