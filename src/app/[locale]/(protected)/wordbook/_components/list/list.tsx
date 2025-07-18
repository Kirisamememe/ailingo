"use client";

import { useEffect } from "react";
import { FlexColumn } from "@/components/ui/flexbox";
import { ListItem } from "./list-item";
import { WordbookListNew } from "./list-new";
import { WordbookListStreaming } from "./list-streaming";
import { useWordbookStore } from "../../_hooks/store-provider";
import { convertWordCardData } from "../../_utils";

/**
 * ワードブックリスト
 */
export const WordbookList = () => {
  const wordCards = useWordbookStore((state) => state.wordCards);
  const nextWord = useWordbookStore((state) => state.nextWord);
  const prevWord = useWordbookStore((state) => state.prevWord);

  useEffect(() => {
    const onFocusChange = (e: KeyboardEvent) => {
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
  }, [prevWord, nextWord]);

  return (
    <FlexColumn className="w-full">
      <WordbookListNew />
      <WordbookListStreaming />
      {wordCards.map((wordCard, index) => (
        <ListItem key={wordCard.id} index={index} listItem={convertWordCardData(wordCard)} />
      ))}
    </FlexColumn>
  );
};
