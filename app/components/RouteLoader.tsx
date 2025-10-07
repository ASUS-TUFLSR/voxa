"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const RouteLoader = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Listen for route changes using Next.js app router navigation events
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // Patch the router.push and router.replace methods to trigger loader
    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = (...args: Parameters<typeof router.push>) => {
      handleStart();
      setTimeout(() => handleComplete(), 800); // fallback in case transition finishes instantly
      return originalPush(...args);
    };

    router.replace = (...args: Parameters<typeof router.replace>) => {
      handleStart();
      setTimeout(() => handleComplete(), 800);
      return originalReplace(...args);
    };

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [router]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-red-600 animate-pulse z-[9999]" />
  );
};

export default RouteLoader;
