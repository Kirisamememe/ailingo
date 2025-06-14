"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ListItemView } from "./list-item-view";
import type { WordListItem } from "../../_types";

type Props = {
  listItem: WordListItem;
};

/**
 * ワードブックリストアイテム
 */
export const ListItem: React.FC<Props> = ({ listItem }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const wordCardId = Number(searchParams.get("wordCardId"));

  const onClick = () => {
    const currentSearchParams = new URLSearchParams(searchParams);
    currentSearchParams.set("wordCardId", listItem.id.toString());

    const newUrl = `${pathname}?${currentSearchParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  return (
    <ListItemView listItem={listItem} onClick={onClick} selected={listItem.id === wordCardId} />
  );
};
