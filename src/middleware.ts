import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  // Route v1 subdomain to v1 static site
  if (hostname === "v1.marwanbaz.dev" || hostname === "www.v1.marwanbaz.dev") {
    const url = request.nextUrl.clone();
    url.pathname = "/v1" + url.pathname;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
