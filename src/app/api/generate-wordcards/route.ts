import type { z } from "zod";
import { ai } from "@/lib/ai/ai";
import type { wordcardRequestSchema } from "@/app/[locale]/(protected)/wordbook/_schema";
import { wordcardAISchemaArray } from "@/app/[locale]/(protected)/wordbook/_schema";
import { auth } from "@/auth";
import { LANGUAGES, LANGUAGE_CODES } from "@/constants";

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
    The translation of the definitions and examples should be in ${LANGUAGES[translationLanguage]}.
    If the languages of the words (for example, whether they're Chinese or English) are not specified, please guess them.
    Currently, the only supported languages are ${LANGUAGE_CODES.join(", ")}.
    If there are words that do not exist in these languages, first analyze whether they are misspellings, and if so, generate them with the correct spelling.
    If they are not misspellings and are definitely non-existent words, please ignore them.
    If all the words sent by the user are non-existent, return an empty object.
    If there are words in plural form, please change them to singular form.
    If there are words in past tense, please return them to their base form.
    If there are words in participle form and those participles have no special meaning or are not widely recognized as independent words, please return them to their base form.
    If there are alphabetical words, all letters of them should be lowercase.
    If there are English words among them and no specific region is indicated, use en-US.  
    If there are Chinese words among them, and no specific region is indicated, and traditional characters are not used, use zh-CN.
  `;

  const prompt = `
    Please generate an appropriate wordcards array object about the ${learningLanguage ? LANGUAGES[learningLanguage] : ""} words "${words}".
  `;

  return ai.generate(model, prompt, system, wordcardAISchemaArray).toTextStreamResponse();
});
