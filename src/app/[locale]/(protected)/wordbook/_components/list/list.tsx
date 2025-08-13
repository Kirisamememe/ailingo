"use client";

import { useEffect, useMemo } from "react";
import { useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FlexColumn } from "@/components/ui/flexbox";
import { VirtualList } from "@/components/ui/virtual-list";
import { ListItem } from "./list-item";
import { WordbookListNew } from "./list-new";
import { WordbookListStreaming } from "./list-streaming";
import { useGenerateForm } from "../../_hooks/generate-form-provider";
import { useWordbookStore } from "../../_hooks/store-provider";

/**
 * ワードブックリスト
 */
export const WordbookList = () => {
  const wordCardMap = useWordbookStore((state) => state.wordCardMap);
  const nextWord = useWordbookStore((state) => state.nextWord);
  const prevWord = useWordbookStore((state) => state.prevWord);
  const closeDrawer = useWordbookStore((state) => state.closeDrawer);

  const {
    form: { control },
  } = useGenerateForm();

  const entries = useWatch({ control, name: "entries" });

  const entriesArray = useMemo(() => {
    return entries
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
  }, [entries]);

  useEffect(() => {
    const onFocusChange = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDrawer({ shouldFocus: true });
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

  const wordCards = useMemo(() => {
    let filtered = [...wordCardMap.values()];

    if (entriesArray.length > 0) {
      filtered = filtered.filter((wordCard) => {
        return entriesArray.some((entry) => wordCard.entry.includes(entry));
      });
    }

    return filtered;
  }, [wordCardMap, entriesArray]);

  return (
    <FlexColumn className={cn("w-full px-4 sm:pt-5 [&_[data-content-type=meaning]]:hidden")}>
      <WordbookListNew />
      <WordbookListStreaming />
      <VirtualList
        itemCount={wordCards.length}
        itemHeight={92}
        overScan={8}
        height={"calc(100vh - 12.5rem)"}
      >
        {(index) => <ListItem key={wordCards[index].id} wordCard={wordCards[index]} />}
      </VirtualList>
    </FlexColumn>
  );
};
