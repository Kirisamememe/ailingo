import { z } from "zod";
import { modelListTuple } from "@/lib/ai";
import { TAGS } from "@/constants/tag";
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

const tagsSchema = z.object({
  tags: z.array(z.enum(TAGS)).max(5, "tagsIsTooMany").describe("Tags of the wordcard"),
});

/**
 * AIワードカードリクエストスキーマ
 */
export const wordcardAISchema = wordcardBase
  .and(definitionsArraySchema)
  .and(extraExampleRequiredSchema)
  .and(otherSchema)
  .and(tagsSchema);

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
  entries: z.string().max(500, "wordsIsTooLong"),
});
