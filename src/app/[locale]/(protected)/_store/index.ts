import { createStore } from "zustand/vanilla";
import type { DailyLearningNewEntry, DailyLearningReviewEntry } from "@/types";

/**
 * グローバルストアの型
 */
export type GlobalState = {
  /** 毎日の新規単語 */
  dailyNewEntries: DailyLearningNewEntry[];
  /** 毎日の復習単語 */
  dailyReviewEntries: DailyLearningReviewEntry[];
};

/**
 * グローバルストアのアクション
 */
export type GlobalActions = {
  /** 毎日の新規単語を設定する */
  setDailyNewAndReviewEntries: (
    dailyNewEntries: DailyLearningNewEntry[],
    dailyReviewEntries: DailyLearningReviewEntry[],
  ) => void;
};

/**
 * グローバルストアの型
 */
export type GlobalStore = GlobalState & GlobalActions;

/**
 * グローバルストアの初期状態
 */
export const defaultInitState: GlobalState = {
  dailyNewEntries: [],
  dailyReviewEntries: [],
};

/**
 * グローバルストアを初期化する
 */
export const initStore = (
  dailyNewEntries: DailyLearningNewEntry[],
  dailyReviewEntries: DailyLearningReviewEntry[],
): GlobalState => {
  return {
    ...defaultInitState,
    dailyNewEntries,
    dailyReviewEntries,
  };
};

/**
 * グローバルストアを作成する
 */
export const createGlobalStore = (initState: GlobalState = defaultInitState) =>
  createStore<GlobalStore>()((set) => ({
    ...initState,
    setDailyNewAndReviewEntries: (
      dailyNewEntries: DailyLearningNewEntry[],
      dailyReviewEntries: DailyLearningReviewEntry[],
    ) => {
      set({ dailyNewEntries, dailyReviewEntries });
    },
  }));
