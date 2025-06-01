"use client";

import { useSearchParams } from "next/navigation";
import { ListItemView } from "./list-item-view";
import { useRouter } from "@/i18n";
import type { WordListItem } from "@/types";

type Props = {
  listItem: WordListItem;
};

/**
 * ワードブックリストアイテム
 */
export const ListItem: React.FC<Props> = ({ listItem }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = () => {
    const currentSearchParams = new URLSearchParams(searchParams);
    currentSearchParams.set("wordCardId", listItem.id.toString());
    router.replace(`/wordbook?${currentSearchParams.toString()}`);
  };

  return <ListItemView listItem={listItem} onClick={onClick} />;
};
