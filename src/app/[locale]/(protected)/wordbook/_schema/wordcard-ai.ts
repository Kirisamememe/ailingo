import { z } from "zod";
import { modelListTuple } from "@/lib/ai";
import { definitionsArraySchema, otherSchema, wordcardBase } from "./wordcard";
import { LANGUAGE_CODES } from "@/drizzle/schema";

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
 * AIワードカードリクエストスキーマ
 */
export const wordcardAISchema = wordcardBase
  .and(definitionsArraySchema)
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
