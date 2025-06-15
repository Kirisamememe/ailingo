import type { z } from "zod";
import { ai } from "@/lib/ai/ai";
import type { aiArticleRequestSchema } from "@/lib/ai/schema";
import { aiArticleResponseSchema } from "@/lib/ai/schema";
import { auth } from "@/auth";
import { i18n } from "@/i18n";

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

  const { model, language, prompt, context }: z.infer<typeof aiArticleRequestSchema> =
    await req.json();

  /**
   * システムメッセージ
   */
  const system = `
    You are a great writer. 
    Please generate an appropriate article object in ${i18n.locales[language]}
    following the prompt, the schema, and the context. 
    When you write the body, please write in Markdown format as much as possible. 
    ${context ? `The context is as follows: ${context}.` : ""}
  `;
  return ai.generate(model, prompt, system, aiArticleResponseSchema).toTextStreamResponse();
});
