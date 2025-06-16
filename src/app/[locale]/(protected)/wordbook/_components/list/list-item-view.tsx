import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  word: string;
  language: string;
  isSelected: boolean;
  onClick: () => void;
};

/**
 * ワードブックリストアイテムビュー
 */
export const ListItemView: React.FC<Props> = ({ word, language, isSelected, onClick }) => {
  return (
    <Button
      lang={language}
      onClick={onClick}
      variant="ghost"
      className={cn(
        "relative h-10 w-full justify-start rounded-none px-1.5 text-[0.625rem] font-semibold",
        "@[36rem]:h-13 @[36rem]:rounded-sm @[36rem]:px-4 @[36rem]:text-sm",
        "dark:hover:bg-accent",
        "active:scale-98",
        "after:bg-accent after:absolute after:-bottom-0.25 after:h-0.25 after:content-[''] last:after:hidden",
        "after:left-0 after:w-full @[36rem]:after:left-3 @[36rem]:after:w-[calc(100%-1.5rem)]",
        "hover:after:bg-transparent",
        isSelected &&
          "bg-primary/5 border-primary hover:bg-primary/10 dark:hover:bg-primary/20 text-primary hover:text-primary border-1 after:bg-transparent @[36rem]:text-lg",
      )}
    >
      {word}
    </Button>
  );
};
