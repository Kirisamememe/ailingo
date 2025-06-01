import "server-only";

import { cookies, headers as nextHeaders } from "next/headers";
import { COOKIE_NAME, COOKIE_OPTIONS } from "@/constants/cookie";
import { HEADER_NAME } from "@/constants/header";
import { DEFAULT_LOCALE, type Locale, getLocaleFromAcceptLanguage, isLocale } from "@/i18n/locale";

/**
 * ユーザーのロケールを取得する関数
 * @returns ユーザーのロケール
 */
export const getUserLocale = async (): Promise<Locale> => {
  const cookieStore = await cookies();
  const currentLocale = cookieStore.get(COOKIE_NAME.LOCALE)?.value;

  // Cookieに設定されている場合はその言語を優先する
  if (isLocale(currentLocale)) {
    return currentLocale;
  }

  const headers = await nextHeaders();
  const acceptLanguage = headers.get(HEADER_NAME.ACCEPT_LANGUAGE);

  // Accept-Languageヘッダーから言語を取得する
  return acceptLanguage ? getLocaleFromAcceptLanguage(acceptLanguage) : DEFAULT_LOCALE;
};

/**
 * ユーザーのロケールを設定する関数
 * @param locale - 設定するロケール
 */
export const setUserLocale = async (locale: Locale) => {
  (await cookies()).set(COOKIE_NAME.LOCALE, locale, COOKIE_OPTIONS[COOKIE_NAME.LOCALE]);

  return locale;
};
