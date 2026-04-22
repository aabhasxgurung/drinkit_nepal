import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Hostnames that should show the maintenance page.
// The .vercel.app URL is intentionally excluded so client previews work.
const MAINTENANCE_HOSTS = ["drinkitnepal.com", "www.drinkitnepal.com"];

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/maintenance")) {
    return NextResponse.next();
  }

  const host = request.headers.get("host") ?? "";
  const isMaintenanceHost = MAINTENANCE_HOSTS.includes(host);

  if (isMaintenanceHost && process.env.MAINTENANCE_MODE === "true") {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!maintenance|_next|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico|api).*)",
  ],
};
