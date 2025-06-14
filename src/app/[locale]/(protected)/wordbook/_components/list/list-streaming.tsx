"use client";

import { ListItem } from "./list-item";
import { useWordbook } from "../../_hooks/wordbook-provider";

/**
 * ワードブックリスト
 */
export const WordbookListStreaming = () => {
  const { isComplete } = useWordbook();

  if (isComplete) return null;

  return <ListItem listItem={{ word: "generating...", id: 0, language: "en" }} />;
};
