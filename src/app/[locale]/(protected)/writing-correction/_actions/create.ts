"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import type { WritingCorrectionDBRequestSchema } from "../_schema";
import { writingService } from "@/services/writing-service";

/**
 * 作文添削を作成
 */
export const createWritingCorrection = async (data: WritingCorrectionDBRequestSchema) => {
  const { operatorId } = await getSession();
  await writingService.create(data, operatorId);
  revalidatePath("/writing-correction");
};
