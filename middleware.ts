import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || req.headers.get("authorization")?.split(" ")[1];

  // Protect all routes except /signin and /register
  if (!token && !req.nextUrl.pathname.startsWith("/signin") && !req.nextUrl.pathname.startsWith("/register")) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|signin|register|favicon.ico).*)"],
};
