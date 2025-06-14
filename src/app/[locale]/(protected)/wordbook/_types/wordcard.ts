import type { Locale } from "@/i18n";

/**
 * ワードブックリスト
 */
export type WordListItem = {
  /**
   * ワードカードID
   */
  id: number;
  /**
   * ワード
   */
  word: string;
  /**
   * 言語
   */
  language: Locale;
};
