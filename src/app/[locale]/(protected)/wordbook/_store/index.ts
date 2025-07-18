import { createStore } from "zustand/vanilla";

/**
 * 単語帳の状態
 */
export type WordbookState = {
  /** 選択された単語カードのID */
  selectedWordCardId: number;
  /** ドロワーの開閉 */
  isDrawerOpen: boolean;
  /** 保存中かどうか */
  isSaving: boolean;
};

/**
 * 単語帳のアクション
 */
export type WordbookActions = {
  /** 選択された単語カードのIDを設定する */
  setSelectedWordCardId: (id: number) => void;
  /** ドロワーの開閉を設定する */
  setIsDrawerOpen: (isOpen: boolean) => void;
  /** 保存中かどうかを設定する */
  setIsSaving: (isSaving: boolean) => void;
};

/**
 * 単語帳のストア
 */
export type WordbookStore = WordbookState & WordbookActions;

/**
 * 単語帳のストアを初期化する
 */
export const initStore = (): WordbookState => {
  return {
    selectedWordCardId: -1,
    isDrawerOpen: false,
    isSaving: false,
  };
};

/**
 * 単語帳の初期状態
 */
export const defaultInitState: WordbookState = {
  selectedWordCardId: 0,
  isDrawerOpen: false,
  isSaving: false,
};

/**
 * 単語帳のストアを作成する
 */
export const createWordbookStore = (initState: WordbookState = defaultInitState) => {
  return createStore<WordbookStore>()((set) => ({
    ...initState,
    setSelectedWordCardId: (id: number) => {
      set((state) => {
        if (state.selectedWordCardId === id) {
          return { selectedWordCardId: -1, isDrawerOpen: false };
        }
        return { selectedWordCardId: id, isDrawerOpen: true };
      });
    },
    setIsDrawerOpen: (isOpen: boolean) => {
      set(() => ({ isDrawerOpen: isOpen }));
    },
    setIsSaving: (isSaving: boolean) => {
      set(() => ({ isSaving }));
    },
  }));
};
