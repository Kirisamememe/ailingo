import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  id: number;
  word: string;
  language: string;
  isSelected: boolean;
  onClick: () => void;
};

/**
 * ワードブックリストアイテムビュー
 */
export const ListItemView: React.FC<Props> = ({ id, word, language, isSelected, onClick }) => {
  return (
    <Button
      lang={language}
      onClick={onClick}
      variant="ghost"
      className={cn(
        "dark:hover:bg-accent relative h-13 w-full justify-start font-semibold",
        "active:scale-98",
        "after:bg-accent after:absolute after:-bottom-0.25 after:left-3 after:h-0.25 after:w-[calc(100%-1.5rem)] after:content-[''] last:after:hidden",
        "hover:after:bg-transparent",
        isSelected &&
          "bg-primary/5 border-primary hover:bg-primary/10 dark:hover:bg-primary/20 text-primary hover:text-primary border-1 text-lg after:bg-transparent",
        id <= 0 && "animate-pulse opacity-50",
      )}
    >
      {word}
    </Button>
  );
};
