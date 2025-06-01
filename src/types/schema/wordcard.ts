import { z } from "zod/v4";
import { POS } from "@/generated/prisma";

/**
 * AIワードカードリクエストスキーマ
 */
export const wordcardBaseSchema = z.object({
  word: z
    .string()
    .min(1, "wordIsRequired")
    .max(100, "wordIsTooLong")
    .describe("Word of the wordcard"),
  pos: z.enum(POS).describe("Part of speech of the wordcard").default("OTHER"),
  phonetics: z
    .string()
    .min(1, "phoneticsIsRequired")
    .max(100, "phoneticsIsTooLong")
    .describe("Phonetics of the wordcard"),
  definition: z
    .string()
    .min(1, "definitionIsRequired")
    .max(200, "definitionIsTooLong")
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

const extraExampleOptionalSchema = z.object({
  example2: z.string().max(500, "exampleIsTooLong").optional(),
  example3: z.string().max(500, "exampleIsTooLong").optional(),
});

/**
 * ワードカードフォームスキーマ
 */
export const wordcardFormSchema = wordcardBaseSchema.extend(extraExampleOptionalSchema);

/**
 * AIワードカードリクエストスキーマ
 */
export const wordcardAISchema = wordcardBaseSchema.extend(extraExampleRequiredSchema);
