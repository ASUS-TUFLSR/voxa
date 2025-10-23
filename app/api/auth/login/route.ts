import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "@/prisma";

export async function POST(req: Request) {
  try {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  const response = NextResponse.json({ message: "Login successful", token,
  user: { id: user.id, name: user.name, email: user.email }, });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:"lax",
    maxAge: 7 * 24 * 60 * 60,
    path:"/",
  });
  return response;

 } catch(error){ 
  console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
} 
}
