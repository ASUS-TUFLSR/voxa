/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import BlogItem from "../components/BlogItem";
import { useRouter } from "next/navigation";
import { useLocalUser } from "@/lib/hooks/useLocalUser";

export default function ProfilePage() {
  const { user, token, loading } = useLocalUser();
  const [userData, setUserData] = useState<any>(null);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();

  // Redirect unauthenticated users
  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  // Fetch complete user data (with blogs)
  useEffect(() => {
    if (!user || !token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        setUserData(data);
        console.log("Full user data:", data);
      } catch (error) {
        console.error("Error loading profile:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.replace("/signin");
      } finally {
        setFetching(false);
      }
    };

    fetchUser();
  }, [user, token, router]);

  if (loading || fetching)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading profile...</p>
      </div>
    );

  if (!userData) return null;

  return (
    <section
      className="min-h-screen w-full flex flex-col items-center relative"
      style={{
        backgroundImage: `url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMjBfYV9wYXBlcl90ZXh0dXJlX29mX3NjcmliYmxlX3N0cm9rZV9zaW1wbGVfYW5kX181Mjg2OWM4YS02NGViLTQ2M2EtYmUzMC1hNDY2Zjc2Mjc5YTFfMS5qcGc.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px]"></div>

      {/* Profile Card */}
      <div className="relative z-10 mt-12 bg-white/90 shadow-xl rounded-2xl px-10 py-8 max-w-2xl text-center border border-red-200">
        <div className="flex flex-col items-center">
          <Image
            className="rounded-full border-4 border-red-300 shadow-lg object-cover"
            src={userData.data.profileUrl || "/userIcon.png"}
            alt="User-Profile"
            width={120}
            height={120}
          />
          <h1 className="mt-4 text-3xl font-bold text-red-800 font-serif">
            {userData.data.name}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-red-700">
            <MdEmail className="text-xl" />
            <p className="text-lg font-medium">{userData.data.email}</p>
          </div>
          <p className="mt-4 text-sm text-gray-600 italic">
            ✍️ Blog Count: {userData.data._count?.blogs ?? "0"}
          </p>
        </div>
      </div>

      {/* User Blogs */}
      <div className="relative z-10 w-full max-w-6xl mt-10 px-6">
        <h2 className="text-2xl font-semibold text-red-900 mb-6 text-center font-serif">
          Your Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {userData.data.blogs?.length > 0 ? (
            userData.data.blogs.map((blog: any) => (
              <BlogItem {...blog} key={blog.id} isProfile={true} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 italic">
              No blogs yet. Start writing your first article ✍️
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
