// import { auth } from "./app/_lib/auth";

// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token exists, redirect to the login page
  if (!token) {
    const loginUrl = new URL("/auth/login", req.url);
    // loginUrl.searchParams.set("callbackUrl", req.url); // Preserve return path
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed if token exists
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/booking-types",
    "/dashboard/booking",
    "/dashboard/availability",
    "/dashboard/contact",
    "/dashboard/wallet",
    "/dashboard/integrations",
    "/dashboard/settings",
  ],
};
