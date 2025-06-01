import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

/** Cookie名 */
export const COOKIE_NAME = {
  LOCALE: "NEXT_LOCALE",
} as const;

/** Cookieのオプション */
export const COOKIE_OPTIONS = {
  [COOKIE_NAME.LOCALE]: {
    httpOnly: false,
    maxAge: 31536000,
    path: "/",
    sameSite: "lax",
    secure: true,
  },
} as const satisfies Record<
  (typeof COOKIE_NAME)[keyof typeof COOKIE_NAME],
  Omit<ResponseCookie, "name" | "value">
>;
