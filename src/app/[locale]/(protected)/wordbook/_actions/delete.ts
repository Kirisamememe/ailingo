"use server";

import { getSession } from "@/lib/auth";
import { wordCardService } from "@/services";

/**
 * 単語カード削除
 */
export const deleteWordCard = async (id: number) => {
  await getSession();
  await wordCardService.delete(id);
};
