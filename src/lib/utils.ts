import { type ClassValue, clsx } from "clsx";
import { enUS as en, ja, zhCN, zhTW } from "date-fns/locale";
import { twMerge } from "tailwind-merge";
import type { Language } from "@/generated/prisma";
import type { Locale } from "@/i18n";

/**
 * Utility function to merge class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * ケバブケースからlowerキャメルケースに変換する関数
 */
export const kebabToCamelCase = (kebabCase: string): string => {
  return kebabCase
    .split("-")
    .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join("");
};

/**
 * LocaleからLanguageに変換する関数
 */
export const localeToLanguage = (locale: Locale): Language => {
  return locale.replace("-", "_").toUpperCase() as Language;
};

/**
 * LanguageからLocaleに変換する関数
 */
export const languageToLocale = (language: Language): Locale => {
  const [languageCode, countryCode] = language.split("_");
  return `${languageCode.toLowerCase()}-${countryCode}` as Locale;
};

/**
 * Localeからdate-fnsのlocaleに変換する関数
 */
export function getLocaleForFns(locale?: string) {
  const locales = { en, ja, zhCN, zhTW };
  if (!locale) return locales.en;
  const localeKey = locale.replace("-", "");
  return locales[localeKey as keyof typeof locales];
}
