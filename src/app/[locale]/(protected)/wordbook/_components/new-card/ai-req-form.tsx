"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { AiReqFormView } from "./ai-req-form-view";
import { createWordcards } from "../../_actions/create";
import { modelListTuple } from "@/constants";
import { wordcardAISchemaArray, wordcardRequestSchema } from "@/types";

// バリデーション成功した場合はそのままDBに保存
// バリデーション失敗した場合はFormを出してユーザーに確認

/**
 * AIリクエストフォーム
 */
export const AiReqForm = () => {
  const form = useForm<z.infer<typeof wordcardRequestSchema>>({
    resolver: zodResolver(wordcardRequestSchema),
    defaultValues: {
      model: modelListTuple[1],
      learningLanguage: "en",
      translationLanguage: "ja",
      words: "",
    },
  });

  const onFinish = ({ object }: { object?: z.infer<typeof wordcardAISchemaArray> }) => {
    if (!object) return;
    void createWordcards(object)
      .then(() => {
        toast.success("Wordcards created successfully");
      })
      .catch(() => {
        toast.error("Failed to create wordcards");
      });
  };

  const { submit, isLoading, stop } = useObject({
    api: "/api/generate-wordcards",
    schema: wordcardAISchemaArray,
    onFinish,
  });

  const onSubmit = () => {
    const values = form.getValues();
    submit(values);
    form.reset();
  };

  return <AiReqFormView form={form} onSubmit={onSubmit} isLoading={isLoading} stop={stop} />;
};
