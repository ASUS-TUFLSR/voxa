"use client";

import { useEffect, useState, useCallback } from "react";
import {jwtDecode} from "jwt-decode";
import { useRouter } from "next/navigation";

type DecodedToken = {
  id: string;
  name?: string;
  email?: string;
  exp?: number;
  iat?: number;
};

export function useAuth() {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadFromStorage = useCallback(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        setUser(null);
      } else {
        setUser(decoded);
      }
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFromStorage();
    // optionally listen storage events (multi-tab signout)
    const onStorage = (e: StorageEvent) => {
      if (e.key === "token") loadFromStorage();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [loadFromStorage]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/signin");
  }, [router]);

  const setToken = useCallback((token: string) => {
    localStorage.setItem("token", token);
    loadFromStorage();
  }, [loadFromStorage]);

  return { user, loading, isAuthenticated: !!user, logout, setToken };
}
