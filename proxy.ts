import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value;
  const pathname = req.nextUrl.pathname;

  // ✅ Allow login page
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // 🔒 Protect all other admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }
  }

  return NextResponse.next();
}
