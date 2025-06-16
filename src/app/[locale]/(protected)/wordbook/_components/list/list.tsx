"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { FlexColumn } from "@/components/ui/flexbox";
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
    <FlexColumn className="w-20 shrink-0 overflow-x-hidden overflow-y-scroll @[36rem]:w-48 @[40rem]:w-64">
      <WordbookListNew selectedId={wordCardId} onClick={onClick} />
      <WordbookListStreaming />
      {wordList.map((word) => (
        <ListItem key={word.id} listItem={word} selectedId={wordCardId} onClick={onClick} />
      ))}
    </FlexColumn>
  );
};
