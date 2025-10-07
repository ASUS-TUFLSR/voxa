/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const messages = [
  "Fetching data from the void 🌌...",
  "Our agents are decoding the matrix 🧠...",
  "Summoning your content from the cloud ☁️...",
  "Loading… just a little patience ⏳",
  "Optimizing pixels for your eyes 👁️...",
  "Brewing fresh content ☕...",
  "Hang tight, we're speeding through the servers 🚀",
  "Almost there… fine-tuning the experience 🎨",
  "Decrypting next-level awesomeness 🔐...",
];

export default function RouteLoader() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const prevPathRef = useRef<string | null>(null);

  // store previous path
  useEffect(() => {
    prevPathRef.current = pathname;
  }, []);

  // listen for internal link clicks
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;

      const anchor = el.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
      } catch {}

      // internal link clicked → show loader + random message
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
      setLoading(true);
    };

    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  }, []);

  // patch router.push & replace
  useEffect(() => {
    const originalPush = (router as any).push?.bind(router);
    const originalReplace = (router as any).replace?.bind(router);

    if (originalPush) {
      (router as any).push = (...args: any[]) => {
        setMessage(messages[Math.floor(Math.random() * messages.length)]);
        setLoading(true);
        return originalPush(...args);
      };
    }
    if (originalReplace) {
      (router as any).replace = (...args: any[]) => {
        setMessage(messages[Math.floor(Math.random() * messages.length)]);
        setLoading(true);
        return originalReplace(...args);
      };
    }

    return () => {
      if (originalPush) (router as any).push = originalPush;
      if (originalReplace) (router as any).replace = originalReplace;
    };
  }, [router]);

  // stop loader when path changes
  useEffect(() => {
    if (prevPathRef.current && pathname !== prevPathRef.current) {
      setTimeout(() => setLoading(false), 300); // small fade delay
    }
    prevPathRef.current = pathname;
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="route-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/70 backdrop-blur-md"
        >
          <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-800 font-medium text-center px-4">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
