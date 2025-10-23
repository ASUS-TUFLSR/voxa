"use client";

import Link from "next/link";
import Logo from "./Logo";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

const authLinks = [
  { id: "1-1", name: "Blogs", url: "/blogs" },
  { id: "1-2", name: "Write", url: "/blogs/add" },
  { id: "1-3", name: "Profile", url: "/profile" },
  { id: "1-4", name: "Search", url: "/search" },
];

const nonAuthLinks = [
  { id: "2-1", name: "Blogs", url: "/blogs" },
  { id: "2-2", name: "Login", url: "/signin" },
  { id: "2-3", name: "Register", url: "/register" },
];

export default function Appbar() {
  const { loading, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // 🔹 Handle logout and redirect to signin
  const handleLogout = () => {
    logout();
    router.push("/signin");
  };

  // 🕐 While auth state is resolving
  if (loading) {
    return (
      <section className="sticky top-0 w-full bg-red-900 z-50">
        <nav className="flex items-center justify-between px-8 py-4">
          <Logo />
          <div className="flex items-center gap-4 p-2">
            {nonAuthLinks.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="text-amber-100 text-lg font-serif opacity-60"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </section>
    );
  }

  const links = isAuthenticated ? authLinks : nonAuthLinks;

  return (
    <section className="sticky top-0 w-full bg-red-900 z-50">
      <nav className="flex items-center justify-between px-8 py-4">
        <Logo />
        <div className="flex items-center gap-4 p-2">
          {links.map((item) => {
            const active = pathname === item.url;
            return (
              <Link
                key={item.id}
                href={item.url}
                className={`text-amber-100 text-lg font-serif hover:text-amber-200 duration-300 ${
                  active ? "underline underline-offset-4" : ""
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="text-amber-100 text-lg font-serif hover:text-amber-200 duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </section>
  );
}
