"use client";

import { useRef } from "react";
import { ListItemView } from "./list-item-view";
import { useWordbookStore } from "../../_hooks/store-provider";

type Props = {
  index: number;
};

/**
 * ワードブックリストアイテム
 */
export const ListItem: React.FC<Props> = ({ index }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const setSelectedIndex = useWordbookStore((state) => state.setSelectedIndex);

  const onClick = () => {
    if (!ref.current) return;

    setSelectedIndex(index, ref.current);
  };

  return <ListItemView ref={ref} index={index} onClick={onClick} />;
};
