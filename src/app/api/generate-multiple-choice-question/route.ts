import type { z } from "zod";
import { ai } from "@/lib/ai/ai";
import { QUESTION_EXAMPLES } from "@/constants/multiple-choice-question";
import type { multipleChoiceQuestionAIRequestSchema } from "@/app/[locale]/(protected)/input/_schema/ai-request";
import { multipleChoiceQuestionResponseSchema } from "@/app/[locale]/(protected)/input/_schema/ai-response";
import { auth } from "@/auth";
import { LANGUAGES } from "@/drizzle/schema";

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
    type,
    entries,
    numberOfQuestions,
  }: z.infer<typeof multipleChoiceQuestionAIRequestSchema> = await req.json();

  /**
   * システムメッセージ
   */
  const system = `
    You are an expert language learning assistant specializing in creating multiple-choice questions. Generate high-quality, pedagogically sound questions that help students learn effectively.

    ## Question Types Available
    - FILL_IN_BLANK: Fill in the blank with the most appropriate choice
    - SELECT_FOR_UNDERLINED: Select the best option for the underlined part (synonym/antonym, definition, usage similarity/difference)
    - COMPREHENSION: Read the passage and answer the question
    - ARRANGEMENT: Choose the correct word order from the given options

    ## Instructions
    1. Create questions that are appropriate for the specified difficulty level
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
    : "Generate questions using a random mix of all available types (FILL_IN_BLANK, SELECT_FOR_UNDERLINED, COMPREHENSION, ARRANGEMENT).";

  // typeに応じて例題を選択
  const examplesSection = type
    ? `## Examples for ${type}\n${QUESTION_EXAMPLES[type]}`
    : `## Examples\n${Object.values(QUESTION_EXAMPLES).join("\n")}`;

  const prompt = `
    Generate appropriate multiple-choice questions for learning ${learningLanguageName} with translations in ${translationLanguageName}.

    ${typeInstruction}

    ${examplesSection}

    ## Vocabulary Entries for Question Creation
    Base the questions on these vocabulary entries:
    ${entriesString}

    ## Important Guidelines for Using Vocabulary Entries:
    - **Purpose**: The goal is to help learners study vocabulary and grammar together
    - **Flexibility**: You do NOT need to create exactly one question per entry
    - **Entry Placement**: Each entry can appear as a choice option, in the question text, or in both - whatever creates the highest quality question. The location of the entry is not important; the educational value of the question is what matters most.
    - **Usage Requirement**: All provided entries should be used appropriately according to their definitions throughout the question set
    - **Repetition Welcome**: The same entry can appear multiple times across different questions
    - **Context Variety**: Use entries in different grammatical contexts and sentence structures
    - **Learning Focus**: Prioritize meaningful language learning over strict adherence to entry distribution

    ## Requirements:
    - Generate exactly ${numberOfQuestions} questions total
    - Each question should have at least 4 choices
    - Include clear explanations for each answer
    - Provide translations for questions and explanations in ${translationLanguageName}
    - For ARRANGEMENT type questions, choicesTranslation can be empty array as word order doesn't need translation
    - Make questions engaging and educational
    - Vary difficulty appropriately
    - Ensure cultural sensitivity and inclusivity

    Focus on creating questions that test genuine understanding rather than mere memorization.
  `;

  return ai
    .generate(model, prompt, system, multipleChoiceQuestionResponseSchema)
    .toTextStreamResponse();
});
