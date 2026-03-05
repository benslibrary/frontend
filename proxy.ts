// proxy.ts (파일 전체 교체)
import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const DEV_SECRET_FALLBACK = "dev-secret-minimum-32-characters-long";
const GUEST_EMAIL_REGEX = /^guest-\d+$/;

function getAuthSecret(): string | undefined {
  return (
    process.env.AUTH_SECRET ||
    (process.env.NODE_ENV === "development" ? DEV_SECRET_FALLBACK : undefined)
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/ping")) {
    return new Response("pong", { status: 200 });
  }

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (pathname === "/" || pathname === "/archive") {
    return NextResponse.next();
  }

  const secret = getAuthSecret();
  if (!secret) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (!token) {
    const redirectUrl = encodeURIComponent(request.url);
    return NextResponse.redirect(
      new URL(`/api/auth/guest?redirectUrl=${redirectUrl}`, request.url)
    );
  }

  const isGuest = GUEST_EMAIL_REGEX.test(token?.email ?? "");

  if (token && !isGuest && ["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/archive", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    "/login",
    "/register",
    /* * [핵심 수정] 아래 정규식에 이미지 확장자들을 추가했습니다.
     * 이제 로고 파일은 보안 요원이 검사하지 않고 바로 통과시킵니다.
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:jpg|jpeg|png|gif|svg|webp|ico)$).*)",
  ],
};
