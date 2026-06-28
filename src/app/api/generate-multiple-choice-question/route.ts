import type { z } from "zod";
import { ai } from "@/lib/ai/ai";
import { requireSession } from "@/lib/auth";
import { toAuthErrorResponse } from "@/lib/auth/response";
import { QUESTION_EXAMPLES } from "@/constants/multiple-choice-question";
import type { multipleChoiceQuestionAIRequestSchema } from "@/app/[locale]/(protected)/input/_schema/ai-request";
import { multipleChoiceQuestionResponseSchema } from "@/app/[locale]/(protected)/input/_schema/ai-response";
import { LANGUAGES } from "@/drizzle/schema";

/**
 * 最大実行時間
 */
export const maxDuration = 300;

/**
 * 記事生成API
 */
export const POST = async function POST(req: Request) {
  try {
    await requireSession(req);
  } catch (error) {
    const authResponse = toAuthErrorResponse(error);
    if (authResponse) return authResponse;
    throw error;
  }

  const {
    model,
    learningLanguage,
    translationLanguage,
    type,
    entries,
    numberOfQuestions,
    difficulty,
  }: z.infer<typeof multipleChoiceQuestionAIRequestSchema> = await req.json();

  /**
   * システムメッセージ
   */
  const system = `
    You are an expert language learning assistant specializing in creating multiple-choice questions. Generate high-quality, pedagogically sound questions that help students learn effectively.

    ## Question Types Available
    - FILL_IN_BLANK: Fill in the blank with the most appropriate choice
    - SELECT_FOR_UNDERLINED: Select the best option for the underlined part (usage similarity selection)
    - ARRANGEMENT: Choose the correct word order from the given options

    ## Instructions
    1. Create questions that are appropriate for the specified difficulty level: ${difficulty}
    2. Ensure all choices are plausible but only one (or specified number) is correct
    3. Provide clear, educational explanations
    4. For underlined selection questions, use <u>underline</u> to mark the target word/phrase
    5. Make questions culturally appropriate and diverse
    6. Ensure translations are accurate and natural when required
    7. For SELECT_FOR_UNDERLINED type, clearly specify which subtype (synonym, antonym, definition, or usage) in the question
    8. Use vocabulary and grammar structures appropriate for intermediate to advanced learners

    ## Output Format
    Always return valid JSON following the specified schema with an array of questions.
  `;

  const entriesString = entries
    .map((entry) => `【${entry.entry}】\n${entry.definitions}`)
    .join("\n");

  const learningLanguageName = learningLanguage !== undefined ? LANGUAGES[learningLanguage] : "";
  const translationLanguageName = LANGUAGES[translationLanguage];

  const typeInstruction = type
    ? `Generate questions ONLY of type "${type}".`
    : "Generate questions using a random mix of all available types (FILL_IN_BLANK, SELECT_FOR_UNDERLINED, ARRANGEMENT).";

  // typeに応じて例題を選択
  const examplesSection = type
    ? `## Examples for ${type}\n${QUESTION_EXAMPLES[type]}`
    : `## Examples\n${Object.values(QUESTION_EXAMPLES).join("\n")}`;

  const prompt = `
    Create ${numberOfQuestions} grammar-focused multiple-choice questions in ${learningLanguageName} with ${translationLanguageName} translations. The difficulty level is ${difficulty}.

    ${typeInstruction}

    ${examplesSection}

    ## Vocabulary Context:
    ${entriesString}

    ## Core Rules:
    1. **Grammar Focus Only**: Create ONLY grammar-related questions. NO simple vocabulary questions.
    2. **Avoid User Entries in Choices**: Do NOT use the provided vocabulary entries as answer choices when possible.
    3. **Question Integration**: Use the vocabulary entries naturally within question contexts to demonstrate grammar usage.
    4. **Choice Strategy**: Create grammatically challenging distractors that test specific grammar knowledge.

    ## Output Requirements:
    - ${numberOfQuestions} questions with 4 choices each
    - Clear explanations focusing on grammar rules
    - Translations in ${translationLanguageName}
    - Educational value over vocabulary memorization
  `;

  return ai
    .generate(model, prompt, system, multipleChoiceQuestionResponseSchema)
    .toTextStreamResponse();
};
