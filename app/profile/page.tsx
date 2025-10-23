/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import BlogItem from "../components/BlogItem";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      fetch(`/api/users/${decoded.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch(() => router.push("/login"));
    } catch (error) {
      router.push("/login");
    }
  }, [router]);

  if (!userData)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading profile...</p>
      </div>
    );

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

      <div className="relative z-10 mt-12 bg-white/90 shadow-xl rounded-2xl px-10 py-8 max-w-2xl text-center border border-red-200">
        <div className="flex flex-col items-center">
          <Image
            className="rounded-full border-4 border-red-300 shadow-lg object-cover"
            src={userData.image || "/userIcon.png"}
            alt="User-Profile"
            width={120}
            height={120}
          />
          <h1 className="mt-4 text-3xl font-bold text-red-800 font-serif">
            {userData.name}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-red-700">
            <MdEmail className="text-xl" />
            <p className="text-lg font-medium">{userData.email}</p>
          </div>
          <p className="mt-4 text-sm text-gray-600 italic">
            ✍️ Blog Count: {userData.blogs?.length || "0"}
          </p>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mt-10 px-6">
        <h2 className="text-2xl font-semibold text-red-900 mb-6 text-center font-serif">
          Your Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {userData.blogs?.length > 0 ? (
            userData.blogs.map((blog: any) => (
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
