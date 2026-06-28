/* eslint-disable jsdoc/require-jsdoc */

import { type NextRequest, NextResponse } from "next/server";
import { buildSessionCookie, setResponseCookie } from "@/lib/auth/cookies";
import { AuthFlowError, ForbiddenError } from "@/lib/auth/errors";
import { exchangeGoogleCallback, findOrCreateGoogleUser } from "@/lib/auth/google";
import { createSession } from "@/lib/auth/session";
import { DEFAULT_LOCALE, isLocale } from "@/i18n";

const getLocaleFromRedirectTo = (redirectTo?: string | null) => {
  const segment = redirectTo?.split("/")[1];
  return isLocale(segment) ? segment : DEFAULT_LOCALE;
};

const getSafeRedirectPath = (redirectTo?: string | null) => {
  if (redirectTo?.startsWith("/") && !redirectTo.startsWith("//")) {
    return redirectTo;
  }

  return `/${DEFAULT_LOCALE}/home`;
};

const getErrorRedirect = (request: NextRequest, redirectTo: string | null, error: string) => {
  const locale = getLocaleFromRedirectTo(redirectTo);
  const url = new URL(`/${locale}/login`, request.url);
  url.searchParams.set("error", error);
  return NextResponse.redirect(url);
};

export const GET = async (request: NextRequest) => {
  let redirectTo: string | null = null;

  try {
    const callback = await exchangeGoogleCallback(request);
    redirectTo = callback.redirectTo ?? null;
    const userId = await findOrCreateGoogleUser(callback.claims, callback.tokens);
    const session = await createSession(userId, request);
    const response = NextResponse.redirect(new URL(getSafeRedirectPath(redirectTo), request.url));

    setResponseCookie(response.cookies, buildSessionCookie(session.token, session.expiresAt));

    return response;
  } catch (error) {
    if (error instanceof ForbiddenError) {
      return getErrorRedirect(request, redirectTo, "forbidden");
    }

    if (error instanceof AuthFlowError) {
      return getErrorRedirect(request, redirectTo, "auth");
    }

    throw error;
  }
};
