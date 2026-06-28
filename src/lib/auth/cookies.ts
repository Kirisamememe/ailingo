/* eslint-disable jsdoc/require-jsdoc */

import type { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { cookies } from "next/headers";
import {
  type CookieMutation,
  SESSION_COOKIE_NAME,
  buildClearSessionCookie,
  buildSessionCookie,
} from "./session-token";

export const parseCookieHeader = (cookieHeader: string | null) => {
  if (!cookieHeader) {
    return new Map<string, string>();
  }

  return new Map(
    cookieHeader
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const separatorIndex = part.indexOf("=");
        if (separatorIndex === -1) {
          return [part, ""];
        }

        return [part.slice(0, separatorIndex), decodeURIComponent(part.slice(separatorIndex + 1))];
      }),
  );
};

export const getSessionTokenFromRequest = (request: Request) => {
  return parseCookieHeader(request.headers.get("cookie")).get(SESSION_COOKIE_NAME);
};

export const getSessionTokenFromCookieStore = (cookieStore: ReadonlyRequestCookies) => {
  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
};

export const setCookieMutation = (
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  mutation: CookieMutation,
) => {
  cookieStore.set(mutation.name, mutation.value, mutation.options);
};

export const setResponseCookie = (cookies: ResponseCookies, mutation: CookieMutation) => {
  cookies.set(mutation.name, mutation.value, mutation.options);
};

export { buildClearSessionCookie, buildSessionCookie };
