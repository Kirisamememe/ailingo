import { z } from "zod/v4";
import type { Locale } from "@/i18n";
import { LOCALES } from "@/i18n";

/**
 * モデルリスト
 */
export const geminiModelListTuple = [
  "gemini-2.5-pro-preview-05-06",
  "gemini-2.5-flash-preview-04-17",
] as const;

/**
 * OpenAIモデルリスト
 */
export const openAIModelListTuple = ["gpt-4.1", "gpt-4.1-mini", "gpt-4.1-nano"] as const;

/**
 * DeepSeekモデルリスト
 */
export const deepseekModelListTuple = ["deepseek-chat"] as const;

/**
 * モデルリスト
 */
export const modelListTuple = [...geminiModelListTuple, ...openAIModelListTuple] as const;

/**
 * AIモデル
 */
export type AIModel = (typeof geminiModelListTuple | typeof openAIModelListTuple)[number];

/**
 * AI言語
 */
export type AILanguage = Locale | "unspecified";

/**
 * AI言語プロンプト
 */
export const languagePrompt = [...LOCALES, "unspecified"] as const as AILanguage[];

/**
 * AI記事リクエストスキーマ
 */
export const aiArticleRequestSchema = z.object({
  model: z.enum(modelListTuple),
  language: z.enum(languagePrompt as [AILanguage]),
  context: z.string().optional(),
  prompt: z.string(),
});

/**
 * AI記事レスポンススキーマ
 */
export const aiArticleResponseSchema = z.object({
  slug: z.string().describe("Slug of the article").default(""),
  title: z.string().describe("Title of the article").default(""),
  summary: z.string().describe("Summary of the article").default(""),
  body: z.string().describe("Body of the article. Please write in Markdown.").default(""),
});
