import { type ClassValue, clsx } from "clsx";
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
