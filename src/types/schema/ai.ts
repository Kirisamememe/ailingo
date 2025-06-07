import { z } from "zod";
import type {
  deepseekModelListTuple,
  geminiModelListTuple,
  openAIModelListTuple,
} from "@/constants/ai";
import { modelListTuple } from "@/constants/ai";
import { LOCALES, type Locale } from "@/i18n";

/**
 * AIモデル
 */
export type AIModel =
  | (typeof geminiModelListTuple)[number]
  | (typeof openAIModelListTuple)[number]
  | (typeof deepseekModelListTuple)[number];

/**
 * AI言語
 */
export type AILanguage = Locale;

/**
 * AI記事リクエストスキーマ
 */
export const aiArticleRequestSchema = z.object({
  model: z.enum(modelListTuple),
  language: z.enum(LOCALES as [AILanguage]),
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
