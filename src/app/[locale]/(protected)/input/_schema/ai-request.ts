import z from "zod";
import { modelListTuple } from "@/lib/ai";
import {
  LANGUAGE_CODES,
  multipleChoiceQuestionDifficulty,
  multipleChoiceQuestionType,
} from "@/drizzle/schema";

/**
 * 複数選択問題リクエストスキーマ
 */
export const multipleChoiceQuestionAIRequestSchema = z.object({
  model: z.enum(modelListTuple),
  learningLanguage: z.enum(LANGUAGE_CODES).optional(),
  translationLanguage: z.enum(LANGUAGE_CODES),
  type: z.enum(multipleChoiceQuestionType.enumValues).optional(),
  difficulty: z.enum(multipleChoiceQuestionDifficulty.enumValues).optional(),
  entries: z
    .array(
      z.object({
        entry: z.string().max(200),
        definitions: z.string().max(1000),
      }),
    )
    .max(15),
});
