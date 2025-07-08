import { type ClassValue, clsx } from "clsx";
import { enUS as en, ja, zhCN, zhTW } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

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
 * Localeからdate-fnsのlocaleに変換する関数
 */
export function getLocaleForFns(locale?: string) {
  const locales = { en, ja, zhCN, zhTW };
  if (!locale) return locales.en;
  const localeKey = locale.replace("-", "");
  return locales[localeKey as keyof typeof locales];
}

/**
 * 現在の日付を取得する（現在のタイムゾーンに基づく）
 */
export const getCurrentDate = () => {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 4) {
    // 朝4時より前は前日扱い
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, "0");
    const day = String(yesterday.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
