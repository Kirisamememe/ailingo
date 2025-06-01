import type { ComponentProps } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ListItem } from "./list-item";

type Props = Pick<ComponentProps<typeof ListItem>, "listItem"> & {
  onClick: () => void;
};

/**
 * ワードブックリストアイテムビュー
 */
export const ListItemView: React.FC<Props> = ({ listItem, onClick }) => {
  return (
    <Button onClick={onClick}>
      {listItem.word}
      <Badge>{listItem.id}</Badge>
    </Button>
  );
};
