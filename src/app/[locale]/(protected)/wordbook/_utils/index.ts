import type { POS, WordCard, WordCardClient } from "@/types";

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
    note: wordCard?.note ?? "",
    language: wordCard?.language ?? "en-US",
  };
};

/**
 * 単語カードデータをクライアント用に変換
 * @param wordCards 単語カード
 * @returns クライアント用の単語カードデータ
 */
export const convertWordCardData = (wordCard: WordCard): WordCardClient => {
  const { definitions, example1, example2, example3, ...rest } = wordCard;

  const definitionsArray = definitions
    .split("\n")
    .filter((definition) => !!definition)
    .map((definition) => {
      const parts = definition.split("|");
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

  const exampleArray = [example1, example2, example3]
    .filter((example) => example !== null)
    .map((example) => {
      const parts = example.split("\n");
      const [sentence, translation] = parts;
      return {
        sentence,
        ...(translation && { translation }),
      };
    });

  return {
    ...rest,
    definitions: definitionsArray,
    examples: exampleArray,
  };
};
