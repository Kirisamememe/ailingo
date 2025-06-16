"use client";

import { CopyPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FlexRow } from "@/components/ui/flexbox";

type Props = {
  selectedId: number;
  onClick: (id: number) => void;
};

/**
 * ワードブックリスト
 */
export const WordbookListNew: React.FC<Props> = ({ selectedId, onClick }) => {
  const t = useTranslations("wordbook");
  const isSelected = selectedId === 0;

  return (
    <FlexRow className="sticky top-0 z-10 mb-2 w-full shrink-0 rounded-none backdrop-blur-lg @[36rem]:rounded-sm">
      <Button
        variant={isSelected ? "coloredOutline" : "outline"}
        className={cn(
          "h-14 w-full rounded-none border-0 text-base font-semibold @[36rem]:justify-start @[36rem]:rounded-sm @[36rem]:border-1",
          isSelected && "@[36rem]:border-2",
        )}
        onClick={() => {
          onClick(0);
        }}
      >
        <CopyPlus className="mx-1 size-5" />
        <span className="hidden @[36rem]:block">{t("list.new")}</span>
      </Button>
    </FlexRow>
  );
};
