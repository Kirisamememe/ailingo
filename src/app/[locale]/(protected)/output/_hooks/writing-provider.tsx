"use client";

import { type ReactNode, createContext, use, useMemo, useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { DeepPartial } from "ai";
import { type UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { AIModel } from "@/lib/ai";
import { createWritingCorrection } from "../_actions/create";
import {
  type WritingCorrectionAIRequestSchema,
  type WritingCorrectionDBRequestSchema,
  writingCorrectionAIGeneratedContentSchema,
  writingCorrectionAIRequestSchema,
} from "../_schema";
import type { LanguageCode } from "@/types";

/**
 * WordbookContextの型定義
 */
type WritingCorrectionContextType = {
  /** ワードリスト */
  object?: DeepPartial<WritingCorrectionDBRequestSchema> | undefined;
  /** フォームのインスタンス */
  form: UseFormReturn<WritingCorrectionAIRequestSchema>;
  /** フォーム送信ハンドラー */
  submit: (input: WritingCorrectionAIRequestSchema) => void;
  /** ローディング状態 */
  isLoading: boolean;
  /** リクエスト停止ハンドラー */
  stop: () => void;
  /** 保存中かどうか */
  isSaving: boolean;
};

/**
 * WritingCorrectionContext
 */
const WritingCorrectionContext = createContext<WritingCorrectionContextType | undefined>(undefined);

/**
 * WordbookProviderのプロパティ型
 */
type WritingCorrectionProviderProps = {
  /** モデル */
  model: AIModel;
  /** 翻訳言語 */
  targetLanguage: LanguageCode;
  /** フィードバック言語 */
  feedbackLanguage: LanguageCode;
  /** 子要素 */
  children: ReactNode;
};

/**
 * WordbookProvider - 単語帳関連のロジックを提供
 */
export const WritingCorrectionProvider = ({
  model,
  targetLanguage = "en-US",
  feedbackLanguage = "ja",
  children,
}: WritingCorrectionProviderProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const form = useForm<WritingCorrectionAIRequestSchema>({
    resolver: zodResolver(writingCorrectionAIRequestSchema),
    defaultValues: {
      original: "",
      targetLanguage,
      feedbackLanguage,
      context: undefined,
      model: model,
    },
  });

  const { object, submit, isLoading, stop } = useObject({
    api: "/api/writing-correction",
    schema: writingCorrectionAIGeneratedContentSchema,
    onFinish: async ({ object }) => {
      if (!object) return;

      try {
        setIsSaving(true);
        const { original, context } = form.getValues();
        const payload = {
          original,
          context,
          ...object,
        };
        await createWritingCorrection(payload);
        form.reset();
        toast.success("Writing correction created successfully");
      } catch {
        toast.error("Failed to create writing correction");
      } finally {
        setIsSaving(false);
      }
    },
  });

  const value = useMemo(
    () => ({
      form,
      isLoading,
      stop,
      submit,
      isSaving,
      object,
    }),
    [form, isLoading, isSaving, object, stop, submit],
  );

  return <WritingCorrectionContext value={value}>{children}</WritingCorrectionContext>;
};

/**
 * WordbookContextを使用するためのフック
 */
export const useWritingCorrection = () => {
  const context = use(WritingCorrectionContext);
  if (!context) {
    throw new Error("useWritingCorrection must be used within WritingCorrectionProvider");
  }
  return context;
};
