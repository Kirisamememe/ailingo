import z from "zod";
import {
  LANGUAGE_CODES,
  multipleChoiceQuestionDifficulty,
  multipleChoiceQuestionType,
  questionTag,
} from "@/drizzle/schema";

/**
 * 複数選択問題挿入スキーマ
 */
export const multipleChoiceQuestionInsertSchema = z.object({
  type: z.enum(multipleChoiceQuestionType.enumValues).describe("The type of the question"),
  difficulty: z
    .enum(multipleChoiceQuestionDifficulty.enumValues)
    .describe("The difficulty of the question"),
  question: z.string().describe("The question"),
  choices: z.array(z.string()).min(4).max(10).describe("The choices. At least 4, at most 10."),
  explanation: z.string().describe("The explanation of the question"),
  questionTranslation: z.string().describe("The translation of the question"),
  choicesTranslation: z
    .array(z.string())
    .describe(
      "The translation of the choices. If translation is not necessarily required, such as in cases of rearrangement question types, this array may be left empty.",
    ),
  explanationTranslation: z.string().describe("The translation of the explanation"),
  correctAnswers: z
    .array(z.number())
    .min(1)
    .max(3)
    .describe("The correct answers, index of the choices"),
  language: z.enum(LANGUAGE_CODES).describe("The language of the question"),
  translationLanguage: z.enum(LANGUAGE_CODES).describe("The language of the translation"),
  tags: z.array(z.enum(questionTag.enumValues)).max(10).describe("The tags of the question"),
  isSingleChoice: z.boolean().describe("Whether the question is a single choice question"),
});

/**
 * 複数選択問題レスポンススキーマ
 */
export const multipleChoiceQuestionResponseSchema = z.object({
  questions: z.array(multipleChoiceQuestionInsertSchema),
});
