import type { wordCard } from "@/drizzle/schema";
import type { LanguageCode } from "@/types";

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
  language: LanguageCode;
};

/**
 * 単語カード
 */
export type WordCard = typeof wordCard.$inferSelect;
