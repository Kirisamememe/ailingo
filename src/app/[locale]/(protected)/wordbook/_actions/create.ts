"use server";

import { revalidatePath } from "next/cache";
import type { z } from "zod";
import { getSession } from "@/lib/auth";
import type { wordcardAISchema, wordcardAISchemaArray } from "../_schema";
import { wordCardService } from "@/services/wordcard-service";

const DIVIDER = "|";

/**
 * ワードカードを複数作成
 */
export const createWordcards = async (data: z.infer<typeof wordcardAISchemaArray>) => {
  const { operatorId } = await getSession();
  const wordcards = data.wordcards.map((wordcard) => ({
    ...wordcard,
    definitions: wordcard.definitions
      .map((definition) => `[${definition.pos}]${DIVIDER}${definition.meaning}`)
      .join("\n"),
  }));
  await wordCardService.createMany(wordcards, operatorId);
  revalidatePath("/wordbook");
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
          `[${definition.pos}]${DIVIDER}${definition.meaning}${DIVIDER}${definition.translation}`,
      )
      .join("\n"),
  };
  await wordCardService.create(wordcard, operatorId);
  revalidatePath("/wordbook");
};
