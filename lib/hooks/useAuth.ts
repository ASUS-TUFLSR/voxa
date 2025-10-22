"use client";

import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

interface DecodedUser {
  id: string;
  name: string;
  email: string;
  iat?: number;
  exp?: number;
}

export const useAuth = () => {
  const [user, setUser] = useState<DecodedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedUser>(token);
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token"); // expired token
          setUser(null);
        } else {
          setUser(decoded);
        }
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/signin"; // redirect to signin
  };

  return { user, loading, isAuthenticated: !!user, logout };
};
