import { z } from "zod";
import { modelListTuple } from "@/lib/ai";
import { otherSchema, wordcardBase } from "./wordcard";
import { LANGUAGE_CODES } from "@/constants";
import { POS } from "@/types";

const extraExampleRequiredSchema = z.object({
  example2: z
    .string()
    .min(1, "exampleIsRequired")
    .max(500, "exampleIsTooLong")
    .describe(
      "Example of the wordcard. Insert a line break (\n) after the example sentence and also write its translation.",
    ),
  example3: z
    .string()
    .min(1, "exampleIsRequired")
    .max(500, "exampleIsTooLong")
    .describe(
      "Example of the wordcard. Insert a line break (\n) after the example sentence and also write its translation.",
    ),
});

/**
 * 定義の配列スキーマ
 */
export const definitionsArraySchema = z
  .array(
    z.object({
      pos: z.enum(POS).describe("Part of speech of the wordcard").default("OTHER"),
      meaning: z
        .string()
        .describe("Meaning of the definition. Generate in the same language as the word."),
      translation: z
        .string()
        .optional()
        .describe(
          "Translation of the definition. It is optional, but unless the user explicitly indicates that it is unnecessary, please always generate it.",
        ),
    }),
  )
  .max(3, "definitionsIsTooMany")
  .describe("Definitions of the wordcard. Up to 3 definitions are allowed.");

/**
 * 定義のAI用スキーマ。DB保存時は文字列に変換
 */
const definitionAISchema = z.object({
  definitions: definitionsArraySchema,
});

/**
 * AIワードカードリクエストスキーマ
 */
export const wordcardAISchema = wordcardBase
  .and(definitionAISchema)
  .and(extraExampleRequiredSchema)
  .and(otherSchema);

/**
 * ワードカードフォームスキーマ配列
 */
export const wordcardAISchemaArray = z.object({
  wordcards: z.array(wordcardAISchema).describe("Wordcards of the wordcard"),
});

/**
 * 単語カードリクエストスキーマ
 */
export const wordcardRequestSchema = z.object({
  model: z.enum(modelListTuple),
  learningLanguage: z.enum(LANGUAGE_CODES).optional(),
  translationLanguage: z.enum(LANGUAGE_CODES),
  words: z.string().max(500, "wordsIsTooLong"),
});
