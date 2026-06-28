/* eslint-disable jsdoc/require-jsdoc */

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { getAuthRouteDecision } from "@/lib/auth/route-policy";
import { SESSION_COOKIE_NAME } from "@/lib/auth/session-token";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const isLoggedIn = request.cookies.has(SESSION_COOKIE_NAME);
  const decision = getAuthRouteDecision(request.nextUrl.pathname, isLoggedIn);

  if (decision.kind === "redirect") {
    return NextResponse.redirect(new URL(decision.location, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
