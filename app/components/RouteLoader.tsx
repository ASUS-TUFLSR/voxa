/* eslint-disable @typescript-eslint/no-explicit-any */
// app/components/RouteLoader.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * RouteLoader
 * - shows a centered spinner when the user clicks an internal <a> or when router.push/replace is called
 * - hides automatically when pathname changes (page finished navigating)
 *
 * Notes:
 * - This is intentionally simple and works well for normal link clicks and programmatic pushes.
 * - Back/forward navigation or server redirects might not show the spinner (they complete quickly or don't emit clicks).
 */

export default function RouteLoader() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const prevPathRef = useRef<string | null>(null);

  // keep previous path so we can stop loading after navigation completes
  useEffect(() => {
    prevPathRef.current = pathname;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set loading = true when user clicks an internal link
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;

      // find closest anchor
      const anchor = el.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      // Ignore anchors with target="_blank" or download or external URLs
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      // If href begins with http(s) and origin differs -> external link (don't show loader)
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
      } catch {
        // ignore invalid URLs, still treat as internal
      }

      // internal link clicked -> show loader
      setLoading(true);
    };

    // capture phase so we get it before Next's Link handles routing
    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  }, []);

  // Also patch programmatic router.push / replace to show loader
  useEffect(() => {
    // Guard: router methods exist
    const originalPush = (router as any).push?.bind(router);
    const originalReplace = (router as any).replace?.bind(router);

    if (originalPush) {
      (router as any).push = (...args: any[]) => {
        setLoading(true);
        return originalPush(...args);
      };
    }
    if (originalReplace) {
      (router as any).replace = (...args: any[]) => {
        setLoading(true);
        return originalReplace(...args);
      };
    }

    return () => {
      if (originalPush) (router as any).push = originalPush;
      if (originalReplace) (router as any).replace = originalReplace;
    };
  }, [router]);

  // Stop loading when the pathname actually changes
  useEffect(() => {
    if (prevPathRef.current && pathname !== prevPathRef.current) {
      setLoading(false);
    }
    prevPathRef.current = pathname;
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/25">
      <div
        aria-hidden="true"
        className="inline-block w-16 h-16 border-4 border-t-red-600 border-gray-200 rounded-full animate-spin"
      />
    </div>
  );
}
