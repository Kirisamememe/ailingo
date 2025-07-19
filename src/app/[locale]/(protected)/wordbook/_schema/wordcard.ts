import { z } from "zod";
import { POS } from "@/constants";
import { LANGUAGE_CODES } from "@/drizzle/schema";

/**
 * AIワードカードリクエストスキーマ
 */
export const wordcardBase = z.object({
  entry: z
    .string()
    .min(1, "entryIsRequired")
    .max(100, "entryIsTooLong")
    .describe(
      "Entry of the wordcard. It could be a word or a phrase. If there are alphabetical words, all letters should be lowercase. ",
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
  language: z.enum(LANGUAGE_CODES).describe("Language of the wordcard"),
  translationLanguage: z.enum(LANGUAGE_CODES).describe("Language of the translation"),
});

/**
 * 追加例文オプションスキーマ
 */
const extraExampleOptional = z.object({
  example2: z.string().max(500, "exampleIsTooLong").optional(),
  example3: z.string().max(500, "exampleIsTooLong").optional(),
});

const exampleClientSchema = z.object({
  examples: z
    .array(
      z.object({
        sentence: z.string().min(1, "exampleIsRequired").max(500, "exampleIsTooLong"),
        translation: z.string().max(500, "phoneticsIsTooLong").optional(),
      }),
    )
    .max(3, "exampleIsTooMany"),
});

/**
 * 品詞スキーマ
 */
export const posSchema = z.enum(POS).describe("Part of speech of the wordcard").default("OTHER");

/**
 * 定義のAI用スキーマ。DB保存時は文字列に変換
 */
export const definitionsArraySchema = z.object({
  definitions: z
    .array(
      z.object({
        pos: posSchema,
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
    .describe("Definitions of the wordcard. Up to 3 definitions are allowed."),
});

/**
 * その他のスキーマ
 */
export const otherSchema = z.object({
  collocations: z
    .string()
    .max(500, "collocationsIsTooLong")
    .optional()
    .describe(
      "Collocations of the wordcard. Up to 10 items are allowed. Separate with comma and space(e.g. 'settle down, settle in').",
    ),
  derivatives: z
    .string()
    .max(150, "derivativesIsTooLong")
    .optional()
    .describe(
      "Words related to this word. For example, 'integral' and 'integrate,' or 'objection' and 'object.' They are very important for language learning, so please fill in as many as possible. Up to 10 words are allowed. Separate with comma and space(e.g. 'word1, word2').",
    ),
  synonyms: z
    .string()
    .max(150, "synonymsIsTooLong")
    .optional()
    .describe(
      "Synonyms of the wordcard. Up to 10 words are allowed. Separate with comma and space(e.g. 'word1, word2').",
    ),
  antonyms: z
    .string()
    .max(150, "antonymsIsTooLong")
    .optional()
    .describe(
      "Antonyms of the wordcard. Up to 10 words are allowed. Separate with comma and space(e.g. 'word1, word2').",
    ),
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

/**
 * ワードカードクライアントスキーマ
 */
export const wordcardClientSchema = wordcardBase
  .omit({ example1: true })
  .and(definitionsArraySchema)
  .and(exampleClientSchema)
  .and(otherSchema)
  .and(noteSchema);
