import type { z } from "zod";
import { ai } from "@/lib/ai/ai";
import type { wordcardRequestSchema } from "@/app/[locale]/(protected)/wordbook/_schema";
import { wordcardAISchemaArray } from "@/app/[locale]/(protected)/wordbook/_schema";
import { auth } from "@/auth";
import { i18n } from "@/i18n";

/**
 * 最大実行時間
 */
export const maxDuration = 300;

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
    The translation of the definitions and examples should be in ${i18n.locales[translationLanguage]}.
    If the language of the word (for example, whether it's Chinese or English) is not specified, please guess it.
    Currently, the only supported languages are EN, JA, ZH_CN, and ZH_TW.
    If there are words that do not exist in these four languages, first analyze whether they are misspellings, and if so, generate them with the correct spelling.
    If they are not misspellings and are definitely non-existent words, please ignore them.
    If all the words sent by the user are non-existent, return an empty object.
  `;

  const prompt = `
    Please generate an appropriate wordcards array object about the ${learningLanguage ? i18n.locales[learningLanguage] : ""} words "${words}".
  `;

  return ai.generate(model, prompt, system, wordcardAISchemaArray).toTextStreamResponse();
});
