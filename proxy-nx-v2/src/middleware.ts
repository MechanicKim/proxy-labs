import { NextRequest, NextResponse } from "next/server";

function getReferrerPathname(request) {
  const referrer = request.headers.get("referer");
  return referrer ? new URL(referrer).pathname : null;
}

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname } = nextUrl;

  if (
    pathname.startsWith("/tools") ||
    getReferrerPathname(request)?.startsWith("/tools")
  ) {
    return NextResponse.next();
  }

  const targetUrl = new URL(pathname, `https://www.kurly.com`);
  return NextResponse.rewrite(targetUrl);
}
