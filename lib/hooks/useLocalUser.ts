"use client";
import { useEffect, useState } from "react";
import type { UserItemType } from "@/lib/types";

export function useLocalUser() {
  const [user, setUser] = useState<UserItemType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
    setLoading(false);
  }, []);

  return { user, token, loading };
}
