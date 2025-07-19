"use server";

import type z from "zod";
import { getSession } from "@/lib/auth";
import type { wordcardFormSchema } from "../_schema";
import { wordCardService } from "@/services";

/**
 * 単語カード更新
 */
export const updateWordCard = async (id: number, wordCard: z.infer<typeof wordcardFormSchema>) => {
  await getSession();
  return await wordCardService.update(id, wordCard);
};
