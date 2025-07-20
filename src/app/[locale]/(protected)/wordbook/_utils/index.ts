import { mergeDefinitions } from "@/lib/utils";
import { DB_DEFINITION_DIVIDER } from "@/constants";
import type { POS, WordCard, WordCardListItem } from "@/types";

/**
 * 単語カードフォームデータを取得
 * @param wordCard 単語カード
 * @returns 単語カードフォームデータ
 */
export const getWordCardFormData = (wordCard?: WordCard) => {
  return {
    entry: wordCard?.entry ?? "",
    phonetics: wordCard?.phonetics ?? "",
    definitions: wordCard?.definitions ?? "",
    example1: wordCard?.example1 ?? "",
    example2: wordCard?.example2 ?? "",
    example3: wordCard?.example3 ?? "",
    collocations: wordCard?.collocations ?? "",
    derivatives: wordCard?.derivatives ?? "",
    synonyms: wordCard?.synonyms ?? "",
    antonyms: wordCard?.antonyms ?? "",
    tags: wordCard?.tags ?? [],
    note: wordCard?.note ?? "",
    language: wordCard?.language ?? "en-US",
    translationLanguage: wordCard?.translationLanguage ?? "ja",
  };
};

/**
 * 単語カードデータをクライアント用に変換
 * @param wordCards 単語カード
 * @returns クライアント用の単語カードデータ
 */
export const convertWordCardDBToListItem = (wordCard: WordCard): WordCardListItem => {
  const { definitions, ...rest } = wordCard;

  const definitionsArray = definitions
    .split("\n")
    .filter((definition) => !!definition)
    .map((definition) => {
      const parts = definition.split(DB_DEFINITION_DIVIDER);
      const [posString, meaning, translation = undefined] = parts;

      const pos = posString.replace(/^\[|\]$/g, "");

      return {
        pos: pos as POS,
        meaning,
        translation,
      };
    });

  return {
    ...rest,
    definitions: definitionsArray,
  };
};

/**
 * 単語カードデータをデータベース用に変換
 * @param wordCard 単語カード
 * @returns データベース用の単語カードデータ
 */
export const convertWordCardClientToDB = (wordCard: WordCardListItem): WordCard => {
  return {
    ...wordCard,
    definitions: mergeDefinitions(wordCard.definitions),
  };
};

/**
 * 例文を分割
 * @param example 例文
 * @returns 分割された例文
 */
export const splitExample = (example: string) => {
  const parts = example.split("\n");
  const [sentence, translation] = parts;
  return {
    sentence,
    ...(translation && { translation }),
  };
};

/**
 * 定義を分割
 * @param definitions 定義
 * @returns 分割された定義
 */
export const splitDefinitions = (definitions: string) => {
  return definitions
    .split("\n")
    .filter((definition) => !!definition)
    .map((definition) => {
      const parts = definition.split(DB_DEFINITION_DIVIDER);
      const [posString, meaning, translation = undefined] = parts;
      if (!posString || !meaning) return undefined;

      const pos = posString.replace(/^\[|\]$/g, "");

      return {
        pos: pos as POS,
        meaning,
        translation,
      };
    })
    .filter((definition) => definition !== undefined);
};
