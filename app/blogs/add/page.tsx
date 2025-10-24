"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import { categories } from "@/lib/utils";
import BlogEditor from "../../components/BlogEditor";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function WriteBlog() {
  const { user, token, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/signin");
    }
  }, [loading, isAuthenticated, router]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const handlePublish = async () => {
    if (!token) {
      toast.error("You must be logged in to publish");
      return;
    }

    const formData = new FormData();
    const postData = JSON.stringify({
      author: user?.name || "Anonymous",
      title,
      description,
      location,
      userId: user?.id,
      categoryId: category,
    });

    formData.append("postData", postData);
    if (imageFile) formData.append("image", imageFile);

    try {
      toast.loading("Publishing your post...", { id: "postData" });
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to publish");
      toast.success("Blog published successfully!", { id: "postData" });
      router.push("/blogs");
    } catch (error) {
      toast.error("Failed to publish blog", { id: "postData" });
      console.error(error);
    }
  };

  if (!mounted || loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (!isAuthenticated) return null;

  return (
    <section className="w-full py-10 px-6 bg-orange-200">
      <Toaster position="top-right" />

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
          onClick={handlePublish}
          className="bg-red-700 text-orange-200 px-6 py-3 rounded-xl font-semibold shadow-xl hover:bg-red-800"
        >
          Publish
        </button>
      </div>

      {imageUrl && (
        <div className="flex justify-center my-10">
          <Image
            src={imageUrl}
            alt="New Post"
            width={600}
            height={400}
            className="rounded-lg shadow-xl border-[3px] border-slate-100 max-w-[600px] max-h-[400px] w-auto h-auto object-contain"
          />
        </div>
      )}

      <div className="w-full flex my-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title!"
          className="outline-none border-none font-serif mx-auto p-4 text-2xl text-center font-bold text-red-900 w-full h-28"
        />
      </div>

      <div className="w-full flex my-5">
        <input
          onChange={handleImageChange}
          type="file"
          className="md:w-[500px] sm:w-[300px] m-auto text-red-900 bg-orange-100 p-4 rounded-xl font-semibold"
        />
      </div>

      <div className="w-full flex my-5">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          placeholder="Location Ex: Germany"
          className="md:w-[500px] sm:w-[300px] m-auto text-red-900 bg-orange-100 p-4 rounded-xl font-semibold"
        />
      </div>

      <div className="w-full flex my-5">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="md:w-[500px] sm:w-[300px] m-auto text-red-900 bg-orange-100 p-4 rounded-xl font-semibold"
        >
          <option value="">-- Select Category --</option>
          {categories.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <BlogEditor value={description} onChange={setDescription} />
    </section>
  );
}
