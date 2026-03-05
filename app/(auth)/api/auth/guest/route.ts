import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { signIn } from "@/app/(auth)/auth";
import {
  AUTH_SECRET_OR_DEV_FALLBACK,
  isDevelopmentEnvironment,
} from "@/lib/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirectUrl") || "/archive";

  const token = await getToken({
    req: request,
    secret: AUTH_SECRET_OR_DEV_FALLBACK,
    secureCookie: !isDevelopmentEnvironment,
  });

  if (token) {
    return NextResponse.redirect(new URL("/archive", request.url));
  }

  return signIn("guest", { redirect: true, redirectTo: redirectUrl });
}
