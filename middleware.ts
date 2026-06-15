import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "platingposters.com",
  "www.platingposters.com",
  "localhost",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Block hotlinking of poster images from external sites
  if (pathname.startsWith("/posters/") && pathname.match(/\.(jpg|jpeg|png|webp)$/i)) {
    const referer = req.headers.get("referer");
    // Allow direct browser visits (no referer) and requests from our own site
    if (referer) {
      try {
        const refHost = new URL(referer).hostname;
        const isAllowed = ALLOWED_ORIGINS.some(
          (origin) => refHost === origin || refHost.endsWith(`.${origin}`)
        );
        if (!isAllowed) {
          return new NextResponse(null, { status: 403 });
        }
      } catch {
        // Malformed referer — block it
        return new NextResponse(null, { status: 403 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/posters/:path*"],
};
