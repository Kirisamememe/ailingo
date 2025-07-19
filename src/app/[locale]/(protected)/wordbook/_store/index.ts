import { createStore } from "zustand/vanilla";
import type { WordCardClient } from "@/types";

/**
 * 単語帳の状態
 */
export type WordbookState = {
  /** 単語カード */
  wordCards: WordCardClient[];
  /** 選択された単語カードのID */
  selectedIndex: number;
  /** 選択された単語カードのリファレンス */
  selectedElement: HTMLButtonElement | null;
  /** ドロワーの開閉 */
  isDrawerOpen: boolean;
  /** 保存中かどうか */
  isSaving: boolean;
  /** 編集モードかどうか */
  isEditing: boolean;
};

/**
 * 単語帳のアクション
 */
export type WordbookActions = {
  /** 単語カードを設定する */
  setWordCards: (wordCards: WordCardClient[]) => void;
  /** 単語カードを追加する */
  addWordCards: (wordCards: WordCardClient[]) => void;
  /** 選択された単語カードのIDを設定する */
  setSelectedIndex: (index: number, ref: HTMLButtonElement) => void;
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
  /** 編集モードを設定する */
  setIsEditing: (isEditing: boolean) => void;
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
  selectedIndex: -1,
  selectedElement: null,
  isDrawerOpen: false,
  isSaving: false,
  isEditing: false,
};

/**
 * 単語帳のストアを初期化する
 */
export const initStore = (wordCards: WordCardClient[]): WordbookState => {
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
    setWordCards: (wordCards: WordCardClient[]) => {
      set(() => ({ wordCards }));
    },
    addWordCards: (wordCards: WordCardClient[]) => {
      set((state) => ({ wordCards: [...wordCards, ...state.wordCards] }));
    },
    setSelectedIndex: (index: number, ref: HTMLButtonElement) => {
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
    setIsEditing: (isEditing: boolean) => {
      set(() => ({ isEditing }));
    },
  }));
};

/**
 * キーボード操作で次の単語を選択
 * @param e キーボードイベント
 * @returns 単語帳の状態
 */
const onNextWord = (state: WordbookState, e: KeyboardEvent) => {
  const currentElement = state.selectedElement;
  if (state.selectedIndex >= state.wordCards.length - 1) {
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
    selectedIndex: Math.min(state.selectedIndex + 1, state.wordCards.length - 1),
    selectedElement: nextElement ?? null,
  };
};

/**
 * キーボード操作で前の単語を選択
 * @param e キーボードイベント
 * @returns 単語帳の状態
 */
const onPrevWord = (state: WordbookState, e: KeyboardEvent) => {
  const currentElement = state.selectedElement;

  if (state.selectedIndex <= 0) {
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
    selectedIndex: Math.max(state.selectedIndex - 1, 0),
    selectedElement: prevElement ?? null,
  };
};

/**
 * 単語カードが選択されたときの処理
 * @param index 選択された単語カードのID
 * @param ref 選択された単語カードのリファレンス
 * @returns 単語帳の状態
 */
const onWordCardSelected = (state: WordbookState, index: number, ref: HTMLButtonElement) => {
  if (state.selectedIndex === index && state.isDrawerOpen && state.selectedElement === ref) {
    state.selectedElement.dataset.selected = "false";
    ref.blur();
    return { isDrawerOpen: false, selectedElement: null };
  }

  if (state.selectedElement) {
    state.selectedElement.dataset.selected = "false";
  }
  ref.dataset.selected = "true";
  ref.focus();

  return {
    selectedIndex: index,
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

  return { isDrawerOpen: false, selectedElement: null, isEditing: false };
};
