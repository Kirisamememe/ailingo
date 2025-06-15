"use client";

import { ListItemView } from "./list-item-view";
import type { WordListItem } from "../../_types";

type Props = {
  listItem: WordListItem;
  selectedId: number;
  onClick: (id: number) => void;
};

/**
 * ワードブックリストアイテム
 */
export const ListItem: React.FC<Props> = ({ listItem, selectedId, onClick }) => {
  return (
    <ListItemView
      id={listItem.id}
      word={listItem.word}
      language={listItem.language}
      isSelected={selectedId === listItem.id}
      onClick={() => {
        onClick(listItem.id);
      }}
    />
  );
};
