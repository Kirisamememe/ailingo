"use server";

import type z from "zod";
import { getSession } from "@/lib/auth";
import type { multipleChoiceQuestionResponseSchema } from "./_schema";
import { multipleChoiceQuestionService } from "@/services/multiple-choice-question-service";
import type { AIModel } from "@/types";

/**
 * 複数選択問題を作成する
 */
export const createMultipleChoiceQuestions = async (
  values: z.infer<typeof multipleChoiceQuestionResponseSchema>,
  generatedBy: AIModel,
) => {
  const { operatorId } = await getSession();
  const questions = values.questions.map((question) => ({
    ...question,
    authorId: operatorId,
    generatedBy,
  }));

  return await multipleChoiceQuestionService.saveMultipleChoiceQuestions(questions);
};
