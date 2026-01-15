"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogItemType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = BlogItemType & {
  isProfile?: boolean;
  categoryName?: string;
};

const BlogItem = (props: Props) => {
  const router = useRouter();

  // ✅ Clean HTML -> Text + truncate
  const plainText = props.description.replace(/<[^>]+>/g, "");
  const truncated =
    plainText.length > 100 ? `${plainText.slice(0, 100)}...` : plainText;

  // ✅ Delete Blog
const handleDelete = async () => {
  const confirmDelete = confirm("Are you sure you want to delete this blog?");
  if (!confirmDelete) return;

  const toastId = toast.loading("Deleting blog...");

  try {
    const res = await fetch(`/api/blogs/${props.id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete blog");

    toast.success("Blog deleted successfully 🎉", { id: toastId });

    // Give toast time to display before refreshing
    setTimeout(() => {
      router.refresh();
    }, 1000);
  } catch (err) {
    toast.error("Failed to delete blog 😞", { id: toastId });
    console.error(err);
  }
};


  return (
    <Card
      className="relative border border-red-800/30 
        w-full max-w-[600px] mx-auto my-6 rounded-2xl shadow-md 
        hover:shadow-2xl transition-all duration-500 hover:-translate-y-2
        bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]
        bg-repeat bg-amber-50 overflow-hidden"
    >
      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-linear-to-tr from-red-200/10 to-transparent pointer-events-none" />

      {/* Blog Cover Image */}
      <CardHeader className="p-0">
        <Image
          src={props.imageUrl}
          alt={`Blog cover image for ${props.title}`}
          width={600}
          height={200}
          className="h-48 w-full object-cover rounded-t-2xl"
          loading="lazy"
          priority={false}
        />
      </CardHeader>

      {/* Content Section */}
      <div className="flex flex-col flex-1 relative z-10">
        <CardTitle className="px-5 pt-4 font-serif font-bold text-2xl text-red-900">
          {props.title}
        </CardTitle>

        {/* Metadata */}
        <p className="px-5 text-xs text-gray-600 italic mb-2">
          ✍️ By {props.userId} · 📅{" "}
          {new Date(props.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>

        <CardContent className="px-5 flex-1">
          <p className="tracking-wide text-gray-700 leading-relaxed">
            {truncated}
          </p>
        </CardContent>

        <CardFooter className="px-5 pb-5 flex gap-2 justify-end">
          <Link
            href={`/blogs/view/${props.id}`}
            prefetch
            className="px-4 py-2 rounded-md text-sm font-medium
              border border-red-700 bg-red-700 text-amber-50
              hover:bg-red-800 hover:border-red-800 hover:scale-105
              transition-all duration-300 shadow-sm"
          >
            Read More →
          </Link>

          {props.isProfile && (
            <>
              <Link
                href={`/blogs/edit/${props.id}`}
                prefetch
                className="px-4 py-2 rounded-md text-sm font-medium
                  border border-red-700 bg-red-700 text-amber-50
                  hover:bg-yellow-700 hover:border-yellow-700 hover:scale-105
                  transition-all duration-300 shadow-sm"
              >
                Edit →
              </Link>

              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-md text-sm font-medium
                  border border-red-700 bg-red-700 text-amber-50
                  hover:bg-red-800 hover:border-red-800 hover:scale-105
                  transition-all duration-300 shadow-sm"
              >
                Delete →
              </button>
            </>
          )}
        </CardFooter>
      </div>
    </Card>
  );
};

export default BlogItem;
