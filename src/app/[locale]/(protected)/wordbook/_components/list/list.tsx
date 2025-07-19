"use client";

import { useEffect } from "react";
import { FlexColumn } from "@/components/ui/flexbox";
import { ListItem } from "./list-item";
import { WordbookListNew } from "./list-new";
import { useWordbookStore } from "../../_hooks/store-provider";

/**
 * ワードブックリスト
 */
export const WordbookList = () => {
  const wordCards = useWordbookStore((state) => state.wordCards);
  const nextWord = useWordbookStore((state) => state.nextWord);
  const prevWord = useWordbookStore((state) => state.prevWord);
  const closeDrawer = useWordbookStore((state) => state.closeDrawer);

  useEffect(() => {
    const onFocusChange = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDrawer();
        return;
      }

      if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
        nextWord(e);
      } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
        prevWord(e);
      }
    };

    window.addEventListener("keydown", onFocusChange);
    return () => {
      window.removeEventListener("keydown", onFocusChange);
    };
  }, [prevWord, nextWord, closeDrawer]);

  return (
    <FlexColumn className="mb-24 w-full">
      <WordbookListNew />
      {wordCards.map((wordCard) => (
        <ListItem key={wordCard.id} wordCard={wordCard} />
      ))}
    </FlexColumn>
  );
};
