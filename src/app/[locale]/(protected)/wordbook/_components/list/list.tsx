"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListItem } from "./list-item";
import { WordbookListNew } from "./list-new";
import { WordbookListStreaming } from "./list-streaming";
import type { WordListItem } from "../../_types";

type Props = {
  wordList: WordListItem[];
};

/**
 * ワードブックリスト
 */
export const WordbookList: React.FC<Props> = ({ wordList }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const wordCardId = Number(searchParams.get("wordCardId"));

  const onClick = (id: number) => {
    const currentSearchParams = new URLSearchParams(searchParams);
    currentSearchParams.set("wordCardId", id.toString());

    const newUrl = `${pathname}?${currentSearchParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  return (
    <ScrollArea className="w-20 shrink-0 @[36rem]:w-48 @[40rem]:w-64 [&_[data-slot='scroll-area-scrollbar']]:pt-16">
      <WordbookListNew selectedId={wordCardId} onClick={onClick} />
      <WordbookListStreaming />
      {wordList.map((word) => (
        <ListItem key={word.id} listItem={word} selectedId={wordCardId} onClick={onClick} />
      ))}
    </ScrollArea>
  );
};
