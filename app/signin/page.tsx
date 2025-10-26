/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      if (data.user) {
        login(data.token, data.user);
        router.push("/profile");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/0a/6a/7f/0a6a7fd4b423e2df73f57cf266b84a46.jpg')", // subtle old paper texture
      }}
    >
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-8 w-full max-w-md border border-yellow-200">
        <h1 className="text-3xl font-serif text-center text-red-800 mb-6">
          Welcome Back
        </h1>

        <form onSubmit={submit} className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            type="email"
            className="w-full p-3 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            type="password"
            className="w-full p-3 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            disabled={loading}
            className="w-full py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition duration-200 font-medium"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-700 mt-4">
          Not registered?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-red-700 font-semibold hover:underline"
          >
            Create an account
          </button>
        </p>
      </div>
    </main>
  );
}
