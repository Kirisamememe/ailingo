import { z } from "zod";
import { localeToLanguage } from "@/lib/utils";
import { LANGUAGE_CODES } from "@/constants";
import type { Language } from "@/generated/prisma";

/**
 * AIワードカードリクエストスキーマ
 */
export const wordcardBase = z.object({
  word: z
    .string()
    .min(1, "wordIsRequired")
    .max(100, "wordIsTooLong")
    .describe(
      "Word of the wordcard. If it's an alphabetical word, its all letters should be lowercase.",
    ),
  phonetics: z
    .string()
    .min(1, "phoneticsIsRequired")
    .max(100, "phoneticsIsTooLong")
    .describe(
      "The pronunciation of this word. For example, in English, it would be something like /ˈmɒdərət/; for zh-CN (Simplified Chinese), use pinyin; for zh-TW (Traditional Chinese), use Zhuyin.",
    ),
  example1: z
    .string()
    .min(1, "exampleIsRequired")
    .max(500, "exampleIsTooLong")
    .describe(
      "Example of the wordcard. Insert a line break (\n) after the example sentence and also write its translation.",
    ),
  language: z
    .enum(LANGUAGE_CODES.map(localeToLanguage) as [Language])
    .describe("Language of the wordcard"),
});

/**
 * 追加例文オプションスキーマ
 */
const extraExampleOptional = z.object({
  example2: z.string().max(500, "exampleIsTooLong").optional(),
  example3: z.string().max(500, "exampleIsTooLong").optional(),
});

/**
 * その他のスキーマ
 */
export const otherSchema = z.object({
  derivatives: z
    .string()
    .max(150, "derivativesIsTooLong")
    .optional()
    .describe(
      "Words related to this word. For example, 'integral' and 'integrate,' or 'objection' and 'object.' They are very important for language learning, so please fill in as many as possible. Up to 10 words are allowed. Separate with comma.",
    ),
  synonyms: z
    .string()
    .max(150, "synonymsIsTooLong")
    .optional()
    .describe("Synonyms of the wordcard. Up to 10 words are allowed. Separate with comma."),
  antonyms: z
    .string()
    .max(150, "antonymsIsTooLong")
    .optional()
    .describe("Antonyms of the wordcard. Up to 10 words are allowed. Separate with comma."),
});

const definitionsSchema = z.object({
  definitions: z
    .string()
    .min(1, "definitionIsRequired")
    .max(500, "definitionIsTooLong")
    .describe("Definition of the wordcard"),
});

const noteSchema = z.object({
  note: z.string().max(1000, "noteIsTooLong").optional(),
});

/**
 * ワードカードフォームスキーマ
 */
export const wordcardFormSchema = wordcardBase
  .and(definitionsSchema)
  .and(extraExampleOptional)
  .and(otherSchema)
  .and(noteSchema);
