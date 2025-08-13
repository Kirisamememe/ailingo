"use client";

import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import type { GlobalStore } from "../_store";
import { createGlobalStore, initStore } from "../_store";
import type { DailyLearningNewEntry, DailyLearningReviewEntry } from "@/types/db/daily";

/**
 * グローバルストアコンテキスト
 */
export const GlobalStoreContext = createContext<GlobalStoreApi | undefined>(undefined);

/**
 * グローバルストアのAPI
 */
export type GlobalStoreApi = ReturnType<typeof createGlobalStore>;

type GlobalStoreProviderProps = {
  children: React.ReactNode;
  dailyNewWords: DailyLearningNewEntry[];
  dailyReviewWords: DailyLearningReviewEntry[];
};

/**
 * グローバルストアプロバイダー
 */
export const GlobalStoreProvider = ({
  children,
  dailyNewWords,
  dailyReviewWords,
}: GlobalStoreProviderProps) => {
  const storeRef = useRef<GlobalStoreApi | undefined>(undefined);
  storeRef.current ??= createGlobalStore(initStore(dailyNewWords, dailyReviewWords));

  return <GlobalStoreContext value={storeRef.current}>{children}</GlobalStoreContext>;
};

/**
 * グローバルストアを使用するためのフック
 */
export const useGlobalStore = <T,>(selector: (store: GlobalStore) => T): T => {
  const context = useContext(GlobalStoreContext);
  if (!context) {
    throw new Error("useGlobalStore must be used within GlobalStoreProvider");
  }
  return useStore(context, selector);
};
