"use client";

import { useId } from "react";
import { ListItemView } from "./list-item-view";
import { useGenerateForm } from "../../_hooks/generate-form-provider";
import { useWordbookStore } from "../../_hooks/store-provider";

/**
 * 単語カードリストのストリーミング
 */
export const WordbookListStreaming = () => {
  const { object, isLoading } = useGenerateForm();
  const isSaving = useWordbookStore((state) => state.isSaving);
  const id = useId();

  if (!isLoading && !isSaving) return null;
  if (!object?.wordcards?.length) return null;

  return (
    <>
      {object.wordcards.map(
        (wordcard, index) =>
          wordcard && <ListItemView key={`${id}-${index}`} listItem={wordcard} isStreaming />,
      )}
    </>
  );
};
