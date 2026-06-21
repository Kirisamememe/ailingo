import { useCallback, useEffect, useRef, useState } from "react";
import type { DeepPartial } from "ai";
import type z from "zod";
import { Button } from "@/components/ui/button";
import { FlexColumn } from "@/components/ui/flexbox";
import { createMultipleChoiceQuestion } from "../_actions/create";
import type { multipleChoiceQuestionResponseSchema } from "../_schema";
import { multipleChoiceQuestionInsertSchema } from "../_schema";
import { Question } from "./question";
import { Result } from "./result";
import type { AIModel, MultipleChoiceQuestion } from "@/types";

type Props = {
  isLoading: boolean;
  object: DeepPartial<z.infer<typeof multipleChoiceQuestionResponseSchema> | undefined>;
  generatedBy: AIModel;
};

/**
 * 回答フォーム
 */
export const AnsweringForm: React.FC<Props> = ({ isLoading, object, generatedBy }) => {
  // 保存済みの質問を追跡（質問文をキーとして重複チェック）
  const savedQuestionTextsRef = useRef<Set<string>>(new Set());
  const [savedQuestions, setSavedQuestions] = useState<MultipleChoiceQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [userAnswers] = useState<number[][]>([]);

  const saveQuestion = useCallback(
    async (question: z.infer<typeof multipleChoiceQuestionInsertSchema>) => {
      try {
        const newQuestion = await createMultipleChoiceQuestion(question, generatedBy);
        savedQuestionTextsRef.current.add(question.question);
        setSavedQuestions((prev) => [...prev, newQuestion]);
      } catch {
        return;
      }
    },
    [generatedBy],
  );

  const onNextQuestion = useCallback(() => {
    setCurrentQuestion((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!object?.questions?.length || object.questions.length < 2) return;

    const allQuestions = object.questions;
    const questionsLength = allQuestions.length;

    // 最後以外の質問（完了済み）を処理
    const completedQuestions = allQuestions.slice(0, -1);
    const validCompletedQuestions = completedQuestions
      .map((question) => {
        const parsed = multipleChoiceQuestionInsertSchema.safeParse(question);
        if (!parsed.success) return undefined;
        return parsed.data;
      })
      .filter((question) => question !== undefined);

    // 最後の質問（生成中の可能性がある）を処理
    const lastQuestion = allQuestions[questionsLength - 1];
    let validLastQuestion: z.infer<typeof multipleChoiceQuestionInsertSchema> | undefined;

    // 最後の質問は、生成完了時（isLoading=false）のみ処理
    if (!isLoading && lastQuestion) {
      const parsed = multipleChoiceQuestionInsertSchema.safeParse(lastQuestion);
      if (parsed.success) {
        validLastQuestion = parsed.data;
      }
    }

    // 新しい質問のみを抽出（重複チェック）
    const allValidQuestions = validLastQuestion
      ? [...validCompletedQuestions, validLastQuestion]
      : validCompletedQuestions;

    const newQuestions = allValidQuestions.filter(
      (question) => !savedQuestionTextsRef.current.has(question.question),
    );

    // 新しい質問を順次保存
    newQuestions.forEach((question) => {
      void saveQuestion(question);
    });
  }, [object, saveQuestion, isLoading]);

  return (
    <FlexColumn>
      {!!savedQuestions.length && (
        <>
          <Question number={currentQuestion} question={savedQuestions[currentQuestion]} />
          <Button onClick={onNextQuestion} className="w-fit">
            Next
          </Button>
        </>
      )}
      {!isLoading && !!userAnswers.length && userAnswers.length === savedQuestions.length && (
        <Result />
      )}
    </FlexColumn>
  );
};
