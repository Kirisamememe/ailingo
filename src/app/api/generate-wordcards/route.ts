import type { z } from "zod";
import { ai } from "@/lib/ai";
import { auth } from "@/auth";
import { i18n } from "@/i18n";
import type { wordcardRequestSchema } from "@/types";
import { wordcardAISchemaArray } from "@/types";

/**
 * 最大実行時間
 */
export const maxDuration = 59;

/**
 * 記事生成API
 */
export const POST = auth(async function POST(req) {
  if (!req.auth) {
    return new Response("Unauthorized", { status: 401 });
  }

  const {
    model,
    learningLanguage,
    translationLanguage,
    words,
  }: z.infer<typeof wordcardRequestSchema> = await req.json();

  /**
   * システムメッセージ
   */
  const system = `
    You are a great wordcard generator. 
    Please generate an appropriate wordcards array object following the prompt and the schema. 
    The translation of the examples should be in ${i18n.locales[translationLanguage]}.
  `;

  const prompt = `
    Please generate an appropriate wordcards array object about the words "${words}" in ${i18n.locales[learningLanguage]}
  `;

  return ai.generate(model, prompt, system, wordcardAISchemaArray).toTextStreamResponse();
});
