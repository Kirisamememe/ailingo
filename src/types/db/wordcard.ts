import type { wordCard } from "@/drizzle/schema";
import type { LanguageCode, POS } from "@/types";

/**
 * ワードブックリスト
 */
export type WordListItem = {
  /** ワードカードID */
  id: number;
  /** ワード */
  entry: string;
  /** 言語 */
  language: LanguageCode;
  /** 発音 */
  phonetics: string;
  /** 定義 */
  definitions: Definition[];
  /** 例文 */
  examples: Example[];
};

/**
 * 定義
 */
export type Definition = {
  /** 品詞 */
  pos: POS;
  /** 意味 */
  meaning: string;
  /** 翻訳 */
  translation?: string;
};

/**
 * 例文
 */
export type Example = {
  /** 例文 */
  sentence: string;
  /** 翻訳 */
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
  definitions: Definition[];
  /** 例文 */
  examples: Example[];
};
