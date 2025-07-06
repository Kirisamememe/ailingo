import { MessageSquareOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  stop: () => void;
};

/**
 * AI生成停止ボタン
 */
export const StopButton: React.FC<Props> = ({ stop }) => {
  const t = useTranslations("common");

  return (
    <Button
      type="button"
      onClick={stop}
      variant="destructive"
      size="icon"
      aria-label={t("stop")}
      className={cn(
        "absolute right-4",
        "border-destructive text-destructive hover:bg-destructive/10 size-10 rounded-full border bg-transparent font-semibold",
        "dark:border-destructive dark:text-destructive dark:hover:bg-destructive/10 dark:bg-transparent",
      )}
    >
      <MessageSquareOff className="size-5" />
    </Button>
  );
};
