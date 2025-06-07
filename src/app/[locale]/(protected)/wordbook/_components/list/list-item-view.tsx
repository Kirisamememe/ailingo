import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { ListItem } from "./list-item";

type Props = Pick<ComponentProps<typeof ListItem>, "listItem"> & {
  selected: boolean;
  onClick: () => void;
};

/**
 * ワードブックリストアイテムビュー
 */
export const ListItemView: React.FC<Props> = ({ listItem, selected, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={cn(
        "dark:hover:bg-accent relative h-13 w-full justify-start font-semibold",
        "active:scale-98",
        "after:bg-accent after:absolute after:-bottom-0.25 after:left-3 after:h-0.25 after:w-[calc(100%-1.5rem)] after:content-['']",
        "hover:after:bg-transparent",
        selected &&
          "bg-primary/5 border-primary hover:bg-primary/10 dark:hover:bg-primary/20 text-primary hover:text-primary border-2 text-lg after:bg-transparent",
      )}
    >
      {listItem.word}
    </Button>
  );
};
