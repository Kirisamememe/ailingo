import type { LANGUAGES } from "@/constants";

/** 単語帳対応の言語の型 */
export type LanguageName = (typeof LANGUAGES)[keyof typeof LANGUAGES];

/** 単語帳対応の言語のコードの型 */
export type LanguageCode = keyof typeof LANGUAGES;
