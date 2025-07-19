import { createStore } from "zustand/vanilla";
import type { WordCard } from "@/types";

/**
 * 単語帳の状態
 */
export type WordbookState = {
  /** 単語カード */
  wordCards: WordCard[];
  /** 選択された単語カードのID */
  selectedId: number;
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
  setWordCards: (wordCards: WordCard[]) => void;
  /** 単語カードを追加する */
  addWordCards: (wordCards: WordCard[]) => void;
  /** 単語カードを更新する */
  upsertWordCard: (newWordCard: WordCard) => void;
  /** 単語カードを削除する */
  removeWordCard: (id: number) => void;
  /** 選択された単語カードのIDを設定する */
  setSelectedCard: (id: number, ref: HTMLButtonElement) => void;
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
  selectedId: 0,
  selectedElement: null,
  isDrawerOpen: false,
  isSaving: false,
  isEditing: false,
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
    addWordCards: (wordCards: WordCard[]) => {
      set((state) => ({ wordCards: [...wordCards, ...state.wordCards] }));
    },
    upsertWordCard: (newWordCard: WordCard) => {
      set((state) => ({
        wordCards: state.wordCards.map((wordCard) =>
          wordCard.id === newWordCard.id ? newWordCard : wordCard,
        ),
      }));
    },
    removeWordCard: (id: number) => {
      set((state) => ({
        wordCards: state.wordCards.filter((wordCard) => wordCard.id !== id),
      }));
    },
    setSelectedCard: (id: number, ref: HTMLButtonElement) => {
      set((state) => onWordCardSelected(state, id, ref));
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
  if (state.isEditing) return state;

  const currentElement = state.selectedElement;
  const nextElement =
    currentElement?.nextElementSibling instanceof HTMLButtonElement
      ? currentElement.nextElementSibling.dataset.wordCardId
        ? currentElement.nextElementSibling
        : null
      : null;

  if (!nextElement) {
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

  if (currentElement) {
    e.preventDefault();
    currentElement.dataset.selected = "false";
    nextElement.dataset.selected = "true";
    nextElement.focus();
  }

  return {
    selectedId: Number(nextElement.dataset.wordCardId ?? 0),
    selectedElement: nextElement,
  };
};

/**
 * キーボード操作で前の単語を選択
 * @param e キーボードイベント
 * @returns 単語帳の状態
 */
const onPrevWord = (state: WordbookState, e: KeyboardEvent) => {
  if (state.isEditing) return state;

  const currentElement = state.selectedElement;
  const prevElement =
    currentElement?.previousElementSibling instanceof HTMLButtonElement
      ? currentElement.previousElementSibling.dataset.wordCardId
        ? currentElement.previousElementSibling
        : null
      : null;

  if (!prevElement) {
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

  if (currentElement) {
    e.preventDefault();
    currentElement.dataset.selected = "false";
    prevElement.dataset.selected = "true";
    prevElement.focus();
  }

  return {
    selectedId: Number(prevElement.dataset.wordCardId ?? 0),
    selectedElement: prevElement,
  };
};

/**
 * 単語カードが選択されたときの処理
 * @param id 選択された単語カードのID
 * @param ref 選択された単語カードのリファレンス
 * @returns 単語帳の状態
 */
const onWordCardSelected = (state: WordbookState, id: number, ref: HTMLButtonElement) => {
  if (state.selectedId === id && state.isDrawerOpen && state.selectedElement === ref) {
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
    selectedId: id,
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
