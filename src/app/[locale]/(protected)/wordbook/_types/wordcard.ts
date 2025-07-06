import type { WordCard as WordCardDB } from "@/generated/prisma";
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
 * ワードカードクライアント
 */
export type WordCard = Omit<WordCardDB, "language"> & { language: LanguageCode };
