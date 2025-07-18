import { createStore } from "zustand/vanilla";
import type { WordCard } from "@/types";

/**
 * 単語帳の状態
 */
export type WordbookState = {
  /** 単語カード */
  wordCards: WordCard[];
  /** 選択された単語カードのID */
  selectedWordCardIndex: number;
  /** 選択された単語カードのリファレンス */
  selectedElement: HTMLButtonElement | null;
  /** ドロワーの開閉 */
  isDrawerOpen: boolean;
  /** 保存中かどうか */
  isSaving: boolean;
};

/**
 * 単語帳のアクション
 */
export type WordbookActions = {
  /** 単語カードを設定する */
  setWordCards: (wordCards: WordCard[]) => void;
  /** 選択された単語カードのIDを設定する */
  setSelectedWordCardIndex: (index: number, ref: HTMLButtonElement) => void;
  /** ドロワーの開閉を設定する */
  setIsDrawerOpen: (isOpen: boolean) => void;
  /** 保存中かどうかを設定する */
  setIsSaving: (isSaving: boolean) => void;
  /** 選択された単語カードのIDを増やす */
  nextWord: (e: KeyboardEvent) => void;
  /** 選択された単語カードのIDを減らす */
  prevWord: (e: KeyboardEvent) => void;
  /** ドロワーを閉じる */
  closeDrawer: () => void;
};

/**
 * 単語帳のストア
 */
export type WordbookStore = WordbookState & WordbookActions;

/**
 * 単語帳の初期状態
 */
export const defaultInitState: WordbookState = {
  wordCards: [],
  selectedWordCardIndex: -1,
  selectedElement: null,
  isDrawerOpen: false,
  isSaving: false,
};

/**
 * 単語帳のストアを初期化する
 */
export const initStore = (wordCards: WordCard[]): WordbookState => {
  return {
    ...defaultInitState,
    wordCards,
  };
};

/**
 * 単語帳のストアを作成する
 */
export const createWordbookStore = (initState: WordbookState = defaultInitState) => {
  return createStore<WordbookStore>()((set) => ({
    ...initState,
    setWordCards: (wordCards: WordCard[]) => {
      set(() => ({ wordCards }));
    },
    setSelectedWordCardIndex: (index: number, ref: HTMLButtonElement) => {
      set((state) => onWordCardSelected(state, index, ref));
    },
    setIsDrawerOpen: (isOpen: boolean) => {
      set(() => ({ isDrawerOpen: isOpen }));
    },
    setIsSaving: (isSaving: boolean) => {
      set(() => ({ isSaving }));
    },
    nextWord: (e: KeyboardEvent) => {
      set((state) => onNextWord(state, e));
    },
    prevWord: (e: KeyboardEvent) => {
      set((state) => onPrevWord(state, e));
    },
    closeDrawer: () => {
      set((state) => onDrawerClose(state));
    },
  }));
};

/**
 * キーボード操作で次の単語を選択
 */
const onNextWord = (state: WordbookState, e: KeyboardEvent) => {
  const currentElement = state.selectedElement;
  if (state.selectedWordCardIndex >= state.wordCards.length - 1) {
    if (e.key === "ArrowDown") {
      return state;
    }

    if (currentElement) {
      currentElement.dataset.selected = "false";
    }

    return {
      isDrawerOpen: false,
      selectedElement: null,
    };
  }

  const nextElement =
    currentElement instanceof HTMLButtonElement
      ? (currentElement.nextElementSibling as HTMLButtonElement)
      : null;

  if (currentElement && nextElement) {
    e.preventDefault();
    currentElement.dataset.selected = "false";
    nextElement.dataset.selected = "true";
    nextElement.focus();
  }

  return {
    selectedWordCardIndex: Math.min(state.selectedWordCardIndex + 1, state.wordCards.length - 1),
    selectedElement: nextElement ?? null,
  };
};

/**
 * キーボード操作で前の単語を選択
 */
const onPrevWord = (state: WordbookState, e: KeyboardEvent) => {
  const currentElement = state.selectedElement;

  if (state.selectedWordCardIndex <= 0) {
    if (e.key === "ArrowUp") {
      return state;
    }

    if (currentElement) {
      currentElement.dataset.selected = "false";
    }

    return {
      isDrawerOpen: false,
      selectedElement: null,
    };
  }

  const prevElement =
    currentElement instanceof HTMLButtonElement
      ? (currentElement.previousElementSibling as HTMLButtonElement)
      : null;

  if (currentElement && prevElement) {
    e.preventDefault();
    currentElement.dataset.selected = "false";
    prevElement.dataset.selected = "true";
    prevElement.focus();
  }

  return {
    selectedWordCardIndex: Math.max(state.selectedWordCardIndex - 1, 0),
    selectedElement: prevElement ?? null,
  };
};

/**
 * 単語カードが選択されたときの処理
 */
const onWordCardSelected = (state: WordbookState, index: number, ref: HTMLButtonElement) => {
  if (
    state.selectedWordCardIndex === index &&
    state.isDrawerOpen &&
    state.selectedElement === ref
  ) {
    state.selectedElement.dataset.selected = "false";
    return { isDrawerOpen: false, selectedElement: null };
  }

  ref.dataset.selected = "true";

  return {
    selectedWordCardIndex: index,
    isDrawerOpen: true,
    selectedElement: ref,
  };
};

/**
 * ドロワーが閉じたときの処理
 */
const onDrawerClose = (state: WordbookState) => {
  if (state.selectedElement) {
    state.selectedElement.dataset.selected = "false";
    state.selectedElement.focus();
  }

  return { isDrawerOpen: false, selectedElement: null };
};
