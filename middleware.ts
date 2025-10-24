import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // TEMPORARY DEBUG MODE
  console.log("🔍 Middleware Debug -> token:", token);

  // Disable protection temporarily for debugging
  // if (req.nextUrl.pathname.startsWith("/write") || req.nextUrl.pathname.startsWith("/profile")) {
  //   if (!token) {
  //     console.log("❌ No token found, redirecting to /signin");
  //     return NextResponse.redirect(new URL("/signin", req.url));
  //   }

  //   try {
  //     jwt.verify(token, process.env.JWT_SECRET!);
  //     console.log("✅ Token verified successfully");
  //   } catch {
  //     console.log("⚠️ Invalid token, redirecting to /signin");
  //     return NextResponse.redirect(new URL("/signin", req.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/write", "/profile"], // keep it here for future use
};
