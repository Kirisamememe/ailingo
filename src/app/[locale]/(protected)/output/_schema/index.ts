import { z } from "zod";
import { modelListTuple } from "@/lib/ai";
import { LANGUAGE_CODES } from "@/drizzle/schema";

const writingCorrectionBaseSchema = z.object({
  original: z
    .string()
    .min(1, "originalIsRequired")
    .max(5000, "originalIsTooLong")
    .describe("Original writing"),
  context: z.string().max(2000, "contextIsTooLong").optional().describe("Context of the writing"),
});

/**
 * 作文修正AI生成コンテンツスキーマ
 */
export const writingCorrectionAIGeneratedContentSchema = z.object({
  corrected: z.string().describe("Corrected writing"),
  feedback: z.string().describe("Feedback for the writing"),
  language: z.enum(LANGUAGE_CODES).describe("Language of the writing"),
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
export const writingCorrectionAIRequestSchema = writingCorrectionBaseSchema.and(AIRequestSchema);

/**
 * 作文修正レスポンススキーマ
 */
export const writingCorrectionDBRequestSchema = writingCorrectionBaseSchema.and(
  writingCorrectionAIGeneratedContentSchema,
);

/**
 * 作文修正リクエストスキーマの型定義
 */
export type WritingCorrectionAIRequestSchema = z.infer<typeof writingCorrectionAIRequestSchema>;

/**
 * 作文修正DBリクエストスキーマの型定義
 */
export type WritingCorrectionDBRequestSchema = z.infer<typeof writingCorrectionDBRequestSchema>;
