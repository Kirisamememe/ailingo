"use client";

import { useRef } from "react";
import { ListItemView } from "./list-item-view";
import { useWordbookStore } from "../../_hooks/store-provider";
import type { WordListItem } from "@/types";

type Props = {
  index: number;
  listItem: WordListItem;
};

/**
 * ワードブックリストアイテム
 */
export const ListItem: React.FC<Props> = ({ index, listItem }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const setSelectedWordCardIndex = useWordbookStore((state) => state.setSelectedWordCardIndex);

  const onClick = () => {
    if (!ref.current) return;

    setSelectedWordCardIndex(index, ref.current);
  };

  return <ListItemView ref={ref} listItem={listItem} onClick={onClick} />;
};
