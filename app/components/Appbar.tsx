"use client";
import Link from "next/link";
import Logo from "./Logo";
import { useSession, signOut } from "next-auth/react";

const authLinks = [
  { id: "1-1", name: "Blogs", url: "/blogs" },
  { id: "1-2", name: "Write", url: "/blogs/add" },
  { id: "1-3", name: "Profile", url: "/profile" },
  { id: "1-4", name: "Search", url: "/search" },
];

const nonAuthLinks = [
  { id: "2-1", name: "Blogs", url: "/blogs" },
  { id: "2-2", name: "Login", url: "/login" },
  { id: "2-3", name: "Register", url: "/register" },
];

const Appbar = () => {
  const { status } = useSession();
  const isAuth = status === "authenticated";

  return (
    <section className="sticky top-0 w-full bg-red-900 z-50">
      <nav className="flex items-center justify-between px-8 py-4">
        <Logo />
        <div className="flex items-center gap-4 p-2">
          {(isAuth ? authLinks : nonAuthLinks).map((item) => (
            <Link
              href={item.url}
              key={item.id}
              className="text-amber-100 text-lg font-serif hover:text-amber-200 duration-300"
            >
              {item.name}
            </Link>
          ))}

          {/* ✅ Logout button when authenticated */}
          {isAuth && (
            <button
              onClick={() => signOut({ callbackUrl: "/" })} // redirect to homepage after logout
              className="text-amber-100 text-lg font-serif hover:text-amber-200 duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </section>
  );
};

export default Appbar;
