import type { WordCard } from "@/generated/prisma";

/**
 * 単語カードフォームデータを取得
 * @param wordCard 単語カード
 * @returns 単語カードフォームデータ
 */
export const getWordCardFormData = (wordCard?: WordCard) => {
  return {
    word: wordCard?.word ?? "",
    phonetics: wordCard?.phonetics ?? "",
    definitions: wordCard?.definitions ?? "",
    example1: wordCard?.example1 ?? "",
    example2: wordCard?.example2 ?? "",
    example3: wordCard?.example3 ?? "",
    derivatives: wordCard?.derivatives ?? "",
    synonyms: wordCard?.synonyms ?? "",
    antonyms: wordCard?.antonyms ?? "",
    note: wordCard?.note ?? "",
    language: wordCard?.language ?? "EN_US",
  };
};
