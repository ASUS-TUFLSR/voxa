import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes
const protectedRoutes = ["/profile", "/create", "/edit"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow static files and public routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/register") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  // Check if current route is protected
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      // Redirect to signin if no token found
      const redirectUrl = new URL("/signin", req.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    try {
      // Optionally verify token (backend-safe way)
      const res = await fetch(`${req.nextUrl.origin}/api/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        const redirectUrl = new URL("/signin", req.url);
        redirectUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(redirectUrl);
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Middleware token verification failed:", error);
      const redirectUrl = new URL("/signin", req.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

// Limit middleware to relevant routes only
export const config = {
  matcher: ["/profile", "/blogs/add", "/edit/:path*"],
};
