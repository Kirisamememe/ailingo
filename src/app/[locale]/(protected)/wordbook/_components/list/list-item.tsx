"use client";

import { memo, useRef } from "react";
import { ListItemView } from "./list-item-view";
import { useWordbookStore } from "../../_hooks/store-provider";
import type { WordCardClient } from "@/types";

type Props = {
  wordCard: WordCardClient;
};

const _isEqual = (prevProps: Props, nextProps: Props) => {
  return (
    prevProps.wordCard.id === nextProps.wordCard.id &&
    prevProps.wordCard.updatedAt === nextProps.wordCard.updatedAt
  );
};

/**
 * ワードブックリストアイテム
 */
export const ListItem: React.FC<Props> = memo(({ wordCard }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const setSelectedIndex = useWordbookStore((state) => state.setSelectedCard);

  const onClick = () => {
    if (!ref.current) return;

    setSelectedIndex(wordCard.id, ref.current);
  };

  return <ListItemView ref={ref} onClick={onClick} wordCard={wordCard} />;
}, _isEqual);

ListItem.displayName = "ListItem";
