import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";

/** Locale priority: explicit cookie (user picked) > device/browser
    Accept-Language > English. Bare paths redirect to /<locale>/... */
function detectLocale(req: NextRequest): string {
  const cookie = req.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const accept = req.headers.get("accept-language") ?? "";
  for (const part of accept.split(",")) {
    const code = part.split(";")[0].trim().toLowerCase().slice(0, 2);
    if (isLocale(code)) return code;
  }
  return DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first)) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${detectLocale(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip static assets, API routes, and files with extensions
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
