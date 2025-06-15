"use client";

import { type ReactNode, createContext, use, useEffect, useRef, useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { DeepPartial } from "ai";
import { type UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import type { AIModel } from "@/lib/ai";
import { useScrollState } from "@/components/providers";
import { getOperatorId } from "../../_actions/get-operator";
import { createWordcard } from "../_actions/create";
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
  /** モデル */
  model: AIModel;
  /** 子要素 */
  children: ReactNode;
};

/**
 * WordbookProvider - 単語帳関連のロジックを提供
 */
export const WordbookProvider = ({ model, children }: WordbookProviderProps) => {
  const [isComplete, setIsComplete] = useState(true);
  const audioRef = useRef<HTMLAudioElement | undefined>(undefined);

  const { setHeaderStatic } = useScrollState();

  const form = useForm<z.infer<typeof wordcardRequestSchema>>({
    resolver: zodResolver(wordcardRequestSchema),
    defaultValues: {
      model,
      learningLanguage: "en",
      translationLanguage: "ja",
      words: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    setHeaderStatic(true);
    return () => {
      setHeaderStatic(false);
    };
  }, [setHeaderStatic]);

  useEffect(() => {
    if (audioRef.current) return;
    audioRef.current = new Audio();
  }, []);

  /**
   * AI生成完了時の処理
   */
  const onFinish = async ({ object }: { object?: z.infer<typeof wordcardAISchemaArray> }) => {
    if (!object) return;

    const operatorId = await getOperatorId();

    // 全てのwordcardを同時に作成
    const promises = object.wordcards.map(async (wordcard) => {
      return createWordcard(operatorId, wordcard).then(() => {
        toast.success("Wordcards created successfully");
      });
    });

    try {
      await Promise.all(promises);
      form.reset();
      setIsComplete(true);
    } catch {
      toast.error("Failed to create wordcards");
    }
  };

  const { submit, isLoading, stop, object } = useObject({
    api: "/api/generate-wordcards",
    schema: wordcardAISchemaArray,
    onFinish,
  });

  /**
   * フォーム送信処理
   */
  const onSubmit = () => {
    const values = form.getValues();
    if (!values.words) return;

    setIsComplete(false);
    submit(values);
  };

  const value = {
    form,
    onSubmit,
    isLoading,
    stop,
    isComplete,
    audioRef,
    object,
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
