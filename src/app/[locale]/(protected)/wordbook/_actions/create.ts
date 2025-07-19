"use server";

import type { z } from "zod";
import { getSession } from "@/lib/auth";
import type { wordcardAISchema, wordcardAISchemaArray } from "../_schema";
import { DB_DEFINITION_DIVIDER } from "@/constants";
import { wordCardService } from "@/services/wordcard-service";

/**
 * ワードカードを複数作成
 */
export const createWordcards = async (data: z.infer<typeof wordcardAISchemaArray>) => {
  const { operatorId } = await getSession();
  const wordcards = data.wordcards.map((wordcard) => ({
    ...wordcard,
    definitions: wordcard.definitions
      .map(
        (definition) =>
          `[${definition.pos}]${DB_DEFINITION_DIVIDER}${definition.meaning}${DB_DEFINITION_DIVIDER}${definition.translation}`,
      )
      .join("\n"),
  }));
  return await wordCardService.createMany(wordcards, operatorId);
};

/**
 * ワードカードを作成
 */
export const createWordcard = async (
  operatorId: string,
  data: z.infer<typeof wordcardAISchema>,
) => {
  const wordcard = {
    ...data,
    definitions: data.definitions
      .map(
        (definition) =>
          `[${definition.pos}]${DB_DEFINITION_DIVIDER}${definition.meaning}${DB_DEFINITION_DIVIDER}${definition.translation}`,
      )
      .join("\n"),
  };
  return await wordCardService.create(wordcard, operatorId);
};
