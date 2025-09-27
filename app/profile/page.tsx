import Image from "next/image";
import React from "react";
import { MdEmail } from "react-icons/md";
import BlogItem from "../components/BlogItem";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getUserById } from "@/lib/helpers";
import { UserItemType } from "@/lib/types";

const ProfilePage = async () => {
  const sessionData = await getServerSession(authOptions);
  const userData: UserItemType = await getUserById(sessionData?.user?.id ?? "");

  return (
    <section
      className="min-h-screen w-full flex flex-col items-center relative"
      style={{
        backgroundImage: `url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMjBfYV9wYXBlcl90ZXh0dXJlX29mX3NjcmliYmxlX3N0cm9rZV9zaW1wbGVfYW5kX181Mjg2OWM4YS02NGViLTQ2M2EtYmUzMC1hNDY2Zjc2Mjc5YTFfMS5qcGc.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px]"></div>

      {/* Profile Card */}
      <div className="relative z-10 mt-12 bg-white/90 shadow-xl rounded-2xl px-10 py-8 max-w-2xl text-center border border-red-200">
        <div className="flex flex-col items-center">
          <Image
            className="rounded-full border-4 border-red-300 shadow-lg object-cover"
            src={sessionData?.user.image || "/userIcon.png"}
            alt="User-Profile"
            width={120}
            height={120}
          />
          <h1 className="mt-4 text-3xl font-bold text-red-800 font-serif">
            {sessionData?.user.name}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-red-700">
            <MdEmail className="text-xl" />
            <p className="text-lg font-medium">{sessionData?.user.email}</p>
          </div>
          <p className="mt-4 text-sm text-gray-600 italic">
            ✍️ Blog Count: {userData?._count.blogs || "0"}
          </p>
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="relative z-10 w-full max-w-6xl mt-10 px-6">
        <h2 className="text-2xl font-semibold text-red-900 mb-6 text-center font-serif">
          Your Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {userData.blogs.length > 0 ? (
            userData.blogs.map((blog) => (
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
};

export default ProfilePage;
