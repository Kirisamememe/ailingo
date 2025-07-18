"use client";

import { type ReactNode, createContext, use, useCallback, useEffect, useMemo, useRef } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { DeepPartial } from "ai";
import { type UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import type { AIModel } from "@/lib/ai";
import { getOperatorId } from "../../_actions/get-operator";
import { createWordcard } from "../_actions/create";
import { wordcardAISchemaArray, wordcardRequestSchema } from "../_schema";
import { useWordbookStore } from "./store-provider";
import type { LanguageCode } from "@/types";

/**
 * GenerateFormContextの型定義
 */
type GenerateFormContextType = {
  /** ワードリスト */
  object?: DeepPartial<z.infer<typeof wordcardAISchemaArray>> | undefined;
  /** フォームのインスタンス */
  form: UseFormReturn<z.infer<typeof wordcardRequestSchema>>;
  /** フォーム送信ハンドラー */
  onSubmit: () => void;
  /** ローディング状態 */
  isLoading: boolean;
  /** リクエスト停止ハンドラー */
  stop: () => void;
  /** 音声再生用のAudio要素 */
  audioRef: React.RefObject<HTMLAudioElement | undefined>;
};

/**
 * GenerateFormContext
 */
const GenerateFormContext = createContext<GenerateFormContextType | undefined>(undefined);

/**
 * WordbookProviderのプロパティ型
 */
type GenerateFormProviderProps = {
  /** モデル */
  model: AIModel;
  /** 翻訳言語 */
  translationLanguage: LanguageCode;
  /** 子要素 */
  children: ReactNode;
};

/**
 * GenerateFormProvider - 単語帳関連のロジックを提供
 */
export const GenerateFormProvider = ({
  model,
  translationLanguage,
  children,
}: GenerateFormProviderProps) => {
  const audioRef = useRef<HTMLAudioElement | undefined>(undefined);
  const setIsSaving = useWordbookStore((state) => state.setIsSaving);

  const form = useForm<z.infer<typeof wordcardRequestSchema>>({
    resolver: zodResolver(wordcardRequestSchema),
    defaultValues: {
      model,
      learningLanguage: undefined,
      translationLanguage,
      words: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (audioRef.current) return;
    audioRef.current = new Audio();
  }, []);

  /**
   * AI生成完了時の処理
   */
  const onFinish = async ({ object }: { object?: z.infer<typeof wordcardAISchemaArray> }) => {
    if (!object) {
      toast.error("object is undefined");
      return;
    }

    const operatorId = await getOperatorId();

    // 全てのwordcardを同時に作成
    const promises = object.wordcards.map(async (wordcard) => {
      return createWordcard(operatorId, wordcard).then(() => {
        toast.success("Wordcards created successfully");
      });
    });

    try {
      setIsSaving(true);
      await Promise.all(promises);
      form.reset();
    } catch {
      toast.error("Failed to create wordcards");
    } finally {
      setIsSaving(false);
    }
  };

  const { submit, isLoading, stop, object } = useObject({
    api: "/api/generate-wordcards",
    schema: wordcardAISchemaArray,
    onFinish,
    onError: () => {
      setIsSaving(false);
    },
  });

  /**
   * フォーム送信処理
   */
  const onSubmit = useCallback(() => {
    const values = form.getValues();
    if (!values.words) return;

    submit(values);
  }, [form, submit]);

  const value = useMemo(
    () => ({
      form,
      onSubmit,
      isLoading,
      stop,
      audioRef,
      object,
    }),
    [object, form, onSubmit, isLoading, stop, audioRef],
  );

  return <GenerateFormContext value={value}>{children}</GenerateFormContext>;
};

/**
 * GenerateFormContextを使用するためのフック
 */
export const useGenerateForm = () => {
  const context = use(GenerateFormContext);
  if (!context) {
    throw new Error("useGenerateForm must be used within GenerateFormProvider");
  }
  return context;
};
