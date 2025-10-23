import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/prisma";
import { connectDB } from "@/lib/helpers";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: "All fields required" }, { status: 400 });
  }

  try {
    await connectDB();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    const response = NextResponse.json({ message: "User registered successfully", token });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
    });
    return response;
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
