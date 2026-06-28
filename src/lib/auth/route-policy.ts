/* eslint-disable jsdoc/require-jsdoc */

import { DEFAULT_LOCALE, LOCALES, type Locale, isLocale } from "@/i18n";

export type AuthRouteDecision =
  | {
      kind: "allow";
    }
  | {
      kind: "redirect";
      location: string;
    };

const loginPath = "/login";

export const getPreferredLocale = (pathname: string): Locale => {
  const segment = pathname.split("/")[1];
  return isLocale(segment) ? segment : DEFAULT_LOCALE;
};

export const getAuthRouteDecision = (pathname: string, isLoggedIn: boolean): AuthRouteDecision => {
  const locale = getPreferredLocale(pathname);
  const localePattern = LOCALES.join("|");
  const isLocalizedLogin = new RegExp(`^/(${localePattern})${loginPath}/?$`).test(pathname);
  const isProtectedLocalizedPath = new RegExp(`^/(${localePattern})/.+`).test(pathname);

  if (isLocalizedLogin) {
    return isLoggedIn ? { kind: "redirect", location: `/${locale}/home` } : { kind: "allow" };
  }

  if (isProtectedLocalizedPath && !isLoggedIn) {
    return { kind: "redirect", location: `/${locale}${loginPath}` };
  }

  return { kind: "allow" };
};
