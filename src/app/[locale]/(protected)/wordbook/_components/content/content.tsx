"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WordbookContentView } from "./content-view";
import { EditForm } from "./edit-form";
import { AiReqForm } from "../new-card";
import type { WordCard } from "@/generated/prisma/client";

type Props = {
  wordCards: WordCard[];
};

/**
 * ワードブックコンテンツ
 */
export const WordbookContent: React.FC<Props> = ({ wordCards }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const idParam = searchParams.get("wordCardId");
  const wordCardId = Number(idParam);

  const wordCard =
    wordCardId > 0 ? wordCards.find((wordCard) => wordCard.id === wordCardId) : undefined;

  const isEditing = searchParams.get("edit") === "true";

  const handleEdit = () => {
    const currentSearchParams = new URLSearchParams(searchParams);
    currentSearchParams.set("edit", "true");
    const newUrl = `${pathname}?${currentSearchParams.toString()}`;
    window.history.pushState(null, "", newUrl);
  };

  useEffect(() => {
    if (!wordCards.length) return;
    if (idParam) return; // 既に選択されている場合は何もしない

    const currentSearchParams = new URLSearchParams(searchParams);
    currentSearchParams.set("wordCardId", wordCards[0].id.toString());

    const newUrl = `${pathname}?${currentSearchParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [idParam, pathname, searchParams, wordCards]);

  // 新規生成
  if (wordCardId === 0) {
    return <AiReqForm />;
  }

  if (!wordCard) {
    return null;
  }

  // 編集
  if (isEditing) {
    return <EditForm wordCard={wordCard} />;
  }

  return (
    <>
      <WordbookContentView wordCard={wordCard} />
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="absolute top-5 right-5"
        onClick={handleEdit}
      >
        <SquarePen className="size-5" />
      </Button>
    </>
  );
};
