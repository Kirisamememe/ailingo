import type { NextRequest } from "next/server";
import NextAuth from "next-auth";
import createMiddleware from "next-intl/middleware";
import { authConfig } from "./auth.config";
import { LOCALES } from "@/i18n/locale";
import { routing } from "@/i18n/routing";

export const publicPages = ["/login"];

export const authPages = ["/login"];

const { auth } = NextAuth(authConfig);

const authMiddleware = auth((req) => intlMiddleware(req));

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${LOCALES.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})(/.*)/?$`,
    "i",
  );

  const authPathnameRegex = RegExp(
    `^(/(${LOCALES.join("|")}))?(${authPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
  const isAuthPage = authPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage && !isAuthPage) {
    // console.log("------ intlMiddleware が実行されます！ --------")
    return intlMiddleware(req);
  } else {
    // console.log("------ auth が実行されます！ --------")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
