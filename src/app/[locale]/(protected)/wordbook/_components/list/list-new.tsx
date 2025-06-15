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
    <FlexRow className="sticky top-0 z-10 mb-2 w-full shrink-0 rounded-sm backdrop-blur-lg">
      <Button
        variant={isSelected ? "coloredOutline" : "outline"}
        className={cn(
          "h-14 w-full justify-start text-base font-semibold",
          isSelected && "border-2",
        )}
        onClick={() => {
          onClick(0);
        }}
      >
        <CopyPlus className="mx-1 size-5" />
        {t("list.new")}
      </Button>
    </FlexRow>
  );
};
