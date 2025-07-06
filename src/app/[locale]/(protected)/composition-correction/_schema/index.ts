import { z } from "zod";
import { modelListTuple } from "@/lib/ai";
import { LANGUAGE_CODES } from "@/constants";

const compositionCorrectionBaseSchema = z.object({
  original: z
    .string()
    .min(1, "originalIsRequired")
    .max(5000, "originalIsTooLong")
    .describe("Original composition"),
  context: z
    .string()
    .max(2000, "contextIsTooLong")
    .optional()
    .describe("Context of the composition"),
});

/**
 * 作文修正AI生成コンテンツスキーマ
 */
export const compositionCorrectionAIGeneratedContentSchema = z.object({
  corrected: z.string().describe("Corrected composition"),
  feedback: z.string().describe("Feedback for the composition"),
  language: z.enum(LANGUAGE_CODES).describe("Language of the composition"),
  feedbackLanguage: z.enum(LANGUAGE_CODES).describe("Language of the feedback"),
});

const AIRequestSchema = z.object({
  targetLanguage: z.enum(LANGUAGE_CODES),
  feedbackLanguage: z.enum(LANGUAGE_CODES),
  model: z.enum(modelListTuple),
});

/**
 * 作文修正リクエストスキーマ
 */
export const compositionCorrectionAIRequestSchema =
  compositionCorrectionBaseSchema.and(AIRequestSchema);

/**
 * 作文修正レスポンススキーマ
 */
export const compositionCorrectionDBRequestSchema = compositionCorrectionBaseSchema.and(
  compositionCorrectionAIGeneratedContentSchema,
);

/**
 * 作文修正リクエストスキーマの型定義
 */
export type CompositionCorrectionAIRequestSchema = z.infer<
  typeof compositionCorrectionAIRequestSchema
>;

/**
 * 作文修正DBリクエストスキーマの型定義
 */
export type CompositionCorrectionDBRequestSchema = z.infer<
  typeof compositionCorrectionDBRequestSchema
>;
