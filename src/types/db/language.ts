import type { POS } from "@/constants";
import type { LANGUAGES } from "@/drizzle/schema";

/**
 * 品詞
 */
export type POS = (typeof POS)[number];

/** 単語帳対応の言語の型 */
export type LanguageName = (typeof LANGUAGES)[keyof typeof LANGUAGES];

/** 単語帳対応の言語のコードの型 */
export type LanguageCode = keyof typeof LANGUAGES;
