import { ai } from "@/lib/ai/ai";
import type { WritingCorrectionAIRequestSchema } from "@/app/[locale]/(protected)/writing-correction/_schema";
import { writingCorrectionAIGeneratedContentSchema } from "@/app/[locale]/(protected)/writing-correction/_schema";
import { auth } from "@/auth";
import { LANGUAGES } from "@/drizzle/schema";

/**
 * 最大実行時間
 */
export const maxDuration = 300;

/**
 * 作文添削API
 */
export const POST = auth(async function POST(req) {
  if (!req.auth) {
    return new Response("Unauthorized", { status: 401 });
  }

  const {
    model,
    original,
    context,
    targetLanguage,
    feedbackLanguage,
  }: WritingCorrectionAIRequestSchema = await req.json();

  /**
   * システムメッセージ
   */
  const system = `
    You are an expert language teacher and writing corrector. Your task is to help language learners improve their writing by providing corrected versions of their writings along with detailed feedback.

    Guidelines:
    1. Correct the writing to proper ${LANGUAGES[targetLanguage]} while maintaining the original meaning and intent
    2. If the original text contains words or phrases in languages other than ${LANGUAGES[targetLanguage]}, replace them with appropriate ${LANGUAGES[targetLanguage]} equivalents
    3. Provide feedback in ${LANGUAGES[feedbackLanguage]} that includes:
       - Constructive advice on writing improvement
       - Alternative expressions or phrasings
       - Grammar explanations for mistakes
       - Cultural or contextual notes when relevant
    4. Be encouraging and supportive while being thorough in your corrections
    5. Focus on helping the learner understand not just what to fix, but why it should be fixed

    Always respond with the corrected writing and comprehensive feedback following the provided schema.
  `;

  const prompt = `
    Please correct the following writing and provide detailed feedback.

    ${context ? `Context: ${context}` : ""}
    
    Original writing to correct:
    ${original}

    Please provide:
    1. A corrected version in ${LANGUAGES[targetLanguage]}
    2. Detailed feedback in ${LANGUAGES[feedbackLanguage]} explaining the corrections, improvements, and teaching points
    3. Identify the language of the original writing
  `;

  return ai
    .generate(model, prompt, system, writingCorrectionAIGeneratedContentSchema)
    .toTextStreamResponse();
});
