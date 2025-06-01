import { z } from "zod/v4";
import { POS } from "@/types";

/**
 * AIワードカードリクエストスキーマ
 */
export const wordcardBaseSchema = z.object({
  word: z
    .string()
    .min(1, "wordIsRequired")
    .max(100, "wordIsTooLong")
    .describe("Word of the wordcard"),
  phonetics: z
    .string()
    .min(1, "phoneticsIsRequired")
    .max(100, "phoneticsIsTooLong")
    .describe("Phonetics of the wordcard"),
  definitions: z
    .string()
    .min(1, "definitionIsRequired")
    .max(500, "definitionIsTooLong")
    .describe("Definition of the wordcard"),
  example1: z
    .string()
    .min(1, "exampleIsRequired")
    .max(500, "exampleIsTooLong")
    .describe("Example of the wordcard"),
});

const extraExampleRequiredSchema = z.object({
  example2: z
    .string()
    .min(1, "exampleIsRequired")
    .max(500, "exampleIsTooLong")
    .describe("Example of the wordcard"),
  example3: z
    .string()
    .min(1, "exampleIsRequired")
    .max(500, "exampleIsTooLong")
    .describe("Example of the wordcard"),
});

/**
 * 追加例文オプションスキーマ
 */
const extraExampleOptionalSchema = z.object({
  example2: z.string().max(500, "exampleIsTooLong").optional(),
  example3: z.string().max(500, "exampleIsTooLong").optional(),
});

/**
 * 定義のAI用スキーマ。DB保存時は文字列に変換
 */
const definitionAISchema = z.object({
  definitions: z
    .array(
      z.object({
        definition: z.object({
          pos: z.enum(POS).describe("Part of speech of the wordcard").default("OTHER"),
          meaning: z.string().describe("Meaning of the definition"),
        }),
      }),
    )
    .max(3, "definitionsIsTooMany")
    .describe("Definitions of the wordcard. Up to 3 definitions are allowed."),
});

/**
 * ワードカードフォームスキーマ
 */
export const wordcardFormSchema = wordcardBaseSchema.and(extraExampleOptionalSchema);

/**
 * AIワードカードリクエストスキーマ
 */
export const wordcardAISchema = wordcardBaseSchema
  .and(definitionAISchema)
  .and(extraExampleRequiredSchema);

/**
 * ワードブックリスト
 */
export type WordListItem = {
  /**
   * ワードカードID
   */
  id: number;
  /**
   * ワード
   */
  word: string;
};
