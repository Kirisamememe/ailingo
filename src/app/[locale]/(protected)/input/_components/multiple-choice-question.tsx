"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FlexColumn } from "@/components/ui/flexbox";
import { Headline } from "@/components/ui/typography";
import { GenerateForm } from "./generate-form";
import { useGlobalStore } from "../../_hooks/global-store-provider";
import {
  multipleChoiceQuestionAIRequestSchema,
  multipleChoiceQuestionResponseSchema,
} from "../_schema";
// import { AnsweringForm } from "./answering-form";
import type { AIModel, LanguageCode } from "@/types";

type Props = {
  model: AIModel;
  learningLanguage: LanguageCode;
  translationLanguage: LanguageCode;
};

/**
 * 複数選択問題
 */
export const MultipleChoiceQuestion: React.FC<Props> = ({
  model,
  learningLanguage,
  translationLanguage,
}) => {
  const dailyNewWords = useGlobalStore((state) => state.dailyNewEntries);
  const dailyReviewWords = useGlobalStore((state) => state.dailyReviewEntries);

  const form = useForm({
    defaultValues: {
      entries: [...dailyNewWords, ...dailyReviewWords],
      type: "ARRANGEMENT",
      numberOfQuestions: 5,
      model,
      difficulty: "C1",
      learningLanguage,
      translationLanguage,
    },
    resolver: zodResolver(multipleChoiceQuestionAIRequestSchema),
  });

  const { submit, isLoading, stop } = useObject({
    api: "/api/generate-multiple-choice-question",
    schema: multipleChoiceQuestionResponseSchema,
  });

  return (
    <FlexColumn className="w-full">
      <Headline>複数選択問題</Headline>
      <GenerateForm form={form} submit={submit} isLoading={isLoading} stop={stop} />
      {/* <AnsweringForm isLoading={isLoading} object={object} generatedBy={form.getValues("model")} /> */}
    </FlexColumn>
  );
};
