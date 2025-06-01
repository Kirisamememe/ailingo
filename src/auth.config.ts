import type { NextAuthConfig } from "next-auth";
import { LOCALES } from "./i18n/locale";

const authApi = ["/api/generate-article"];
const loginPath = "/login";

/**
 * ミドルウェア(edge runtime)用のNextAuthオブジェクト
 * 通常のPrismaClientはここでは使えない
 */
export const authConfig = {
  pages: {
    signIn: loginPath,
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname;
      const isLoggedIn = !!auth?.user;
      const localePattern = LOCALES.join("|");
      const isOnProtected = new RegExp(`^/(${localePattern})/.+`).test(pathname);
      const isOnAuthPage = new RegExp(`^/(${localePattern})${loginPath}$`).test(pathname);
      const isAuthApi = authApi.includes(pathname);

      if (!isLoggedIn && isAuthApi) {
        return new Response(undefined, { status: 500 });
      }

      if (isOnProtected) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL(loginPath, request.nextUrl));
      }

      if (isLoggedIn && isOnAuthPage) {
        return Response.redirect(new URL(`/daily`, request.nextUrl));
      }

      if (isLoggedIn) {
        return true;
      }

      return false;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  trustHost: true,
} satisfies NextAuthConfig;
