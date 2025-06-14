"use server";

import { revalidatePath } from "next/cache";
import type { z } from "zod";
import { getSession } from "@/lib/auth";
import { wordCardService } from "@/services/wordcard-service";
import type { wordcardAISchemaArray } from "@/types";

const DIVIDER = "|";

/**
 * ワードカードを作成
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
