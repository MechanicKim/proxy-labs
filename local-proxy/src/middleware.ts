import { NextRequest, NextResponse } from "next/server";
import hostToTarget from "./components/Hosts/hostToTarget";

export async function middleware(request: NextRequest) {
  const { nextUrl, headers } = request;
  const { pathname, search } = nextUrl;

  if (pathname.startsWith("/proxy")) {
    return NextResponse.next();
  }

  const host = headers.get("Host");
  const target = hostToTarget[host];
  if (target) {
    const { protocol, host, port } = target;
    const url = new URL(nextUrl);
    url.protocol = protocol;
    url.host = host;
    url.port = port;
    url.pathname = pathname;
    url.search = search;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}
