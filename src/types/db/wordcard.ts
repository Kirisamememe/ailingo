import type { wordCard } from "@/drizzle/schema";
import type { LanguageCode, POS } from "@/types";

/**
 * ワードブックリスト
 */
export type WordListItem = {
  /** ワードカードID */
  id: number;
  /** ワード */
  word: string;
  /** 言語 */
  language: LanguageCode;
  /** 発音 */
  phonetics: string;
  /** 定義 */
  definitions: Definitions[];
  /** 例文 */
  examples: Examples[];
};

type Definitions = {
  pos: POS;
  meaning: string;
  translation?: string;
};

type Examples = {
  sentence: string;
  translation?: string;
};

/**
 * 単語カード
 */
export type WordCard = typeof wordCard.$inferSelect;

/**
 * 単語カードクライアント
 */
export type WordCardClient = Omit<
  WordCard,
  "definitions" | "example1" | "example2" | "example3"
> & {
  /** 定義 */
  definitions: Definitions[];
  /** 例文 */
  examples: Examples[];
};
