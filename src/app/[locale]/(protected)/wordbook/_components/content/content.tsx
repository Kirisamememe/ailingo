"use client";

import { SquarePen } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { WordbookContentView } from "./content-view";
import { EditForm } from "./edit-form";
import { useWordbookStore } from "../../_hooks/store-provider";

/**
 * ワードブックコンテンツ
 */
export const WordbookContent = () => {
  const t = useTranslations("wordbook");

  const wordCardMap = useWordbookStore((state) => state.wordCardMap);
  const selectedId = useWordbookStore((state) => state.selectedId);
  const isDrawerOpen = useWordbookStore((state) => state.isDrawerOpen);
  const isEditing = useWordbookStore((state) => state.isEditing);
  const setIsDrawerOpen = useWordbookStore((state) => state.setIsDrawerOpen);
  const setIsEditing = useWordbookStore((state) => state.setIsEditing);

  // ストアのMapから直接O(1)でアクセス
  const wordCard = wordCardMap.get(selectedId);

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen} modal={isEditing}>
      <SheetContent
        className="sm:max-w-114"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <ScrollArea className="h-full">
          <SheetTitle hidden>{t("contentSheet.title")}</SheetTitle>
          <SheetDescription hidden>{t("contentSheet.description")}</SheetDescription>
          {isEditing && wordCard && <EditForm wordCard={wordCard} />}
          {!isEditing && wordCard && (
            <>
              <WordbookContentView wordCard={wordCard} />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute top-6 right-6"
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                <SquarePen className="size-5" />
              </Button>
            </>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
