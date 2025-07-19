"use client";

import { type ReactNode, createContext, use, useRef } from "react";
import { useStore } from "zustand";
import type { WordbookStore } from "../_store";
import { createWordbookStore, initStore } from "../_store";
import type { WordCard } from "@/types";

/**
 * ストアコンテキスト
 */
export const StoreContext = createContext<WordbookStoreApi | undefined>(undefined);

/**
 * WordbookProviderのプロパティ型
 */
type WordbookProviderProps = {
  /** 子要素 */
  children: ReactNode;
  /** 単語カード */
  wordCards: WordCard[];
};

/**
 * 単語帳ストアのAPI
 */
export type WordbookStoreApi = ReturnType<typeof createWordbookStore>;

/**
 * WordbookProvider - 単語帳関連のロジックを提供
 */
export const StoreProvider = ({ children, wordCards }: WordbookProviderProps) => {
  const storeRef = useRef<WordbookStoreApi | undefined>(undefined);
  storeRef.current ??= createWordbookStore(initStore(wordCards));

  return <StoreContext value={storeRef.current}>{children}</StoreContext>;
};

/**
 * StoreContextを使用するためのフック
 */
export const useWordbookStore = <T,>(selector: (store: WordbookStore) => T): T => {
  const context = use(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return useStore(context, selector);
};
