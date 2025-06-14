"use client";

import { type ReactNode, createContext, use, useEffect, useRef, useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { DeepPartial } from "ai";
import { type UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { modelListTuple } from "@/lib/ai";
import { createWordcards } from "../_actions/create";
import { wordcardAISchemaArray, wordcardRequestSchema } from "../_schema";

/**
 * WordbookContextの型定義
 */
type WordbookContextType = {
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
  /** リクエスト完了状態 */
  isComplete: boolean;
  /** 音声再生用のAudio要素 */
  audioRef: React.RefObject<HTMLAudioElement | undefined>;
};

/**
 * WordbookContext
 */
const WordbookContext = createContext<WordbookContextType | undefined>(undefined);

/**
 * WordbookProviderのプロパティ型
 */
type WordbookProviderProps = {
  /** 子要素 */
  children: ReactNode;
};

/**
 * WordbookProvider - 単語帳関連のロジックを提供
 */
export const WordbookProvider = ({ children }: WordbookProviderProps) => {
  const [isComplete, setIsComplete] = useState(true);
  const audioRef = useRef<HTMLAudioElement | undefined>(undefined);

  useEffect(() => {
    if (audioRef.current) return;
    audioRef.current = new Audio();
  }, []);

  const form = useForm<z.infer<typeof wordcardRequestSchema>>({
    resolver: zodResolver(wordcardRequestSchema),
    defaultValues: {
      model: modelListTuple[1],
      learningLanguage: "en",
      translationLanguage: "ja",
      words: "",
    },
  });

  /**
   * AI生成完了時の処理
   */
  const onFinish = ({ object }: { object?: z.infer<typeof wordcardAISchemaArray> }) => {
    if (!object) return;
    // TODO: content側で個別保存を検討する
    void createWordcards(object)
      .then(() => {
        toast.success("Wordcards created successfully");
        form.reset();
        setIsComplete(true);
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

  /**
   * フォーム送信処理
   */
  const onSubmit = () => {
    setIsComplete(false);
    const values = form.getValues();
    submit(values);
  };

  const value = {
    form,
    onSubmit,
    isLoading,
    stop,
    isComplete,
    audioRef,
    // TODO: objectのstreamをどう表現するか考える
  };

  return <WordbookContext value={value}>{children}</WordbookContext>;
};

/**
 * WordbookContextを使用するためのフック
 */
export const useWordbook = () => {
  const context = use(WordbookContext);
  if (!context) {
    throw new Error("useWordbook must be used within WordbookProvider");
  }
  return context;
};
