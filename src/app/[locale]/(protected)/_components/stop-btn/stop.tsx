import { MessageCircleX } from "lucide-react";
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
      className={cn("hover:bg-destructive/80 font-semibold", "dark:hover:bg-destructive/80")}
    >
      <MessageCircleX />
    </Button>
  );
};
