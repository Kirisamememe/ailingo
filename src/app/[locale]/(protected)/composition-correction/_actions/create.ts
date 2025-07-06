"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import type { CompositionCorrectionDBRequestSchema } from "../_schema";
import { compositionService } from "@/services/composition-service";

/**
 * 作文添削を作成
 */
export const createCompositionCorrection = async (data: CompositionCorrectionDBRequestSchema) => {
  const { operatorId } = await getSession();
  await compositionService.create(data, operatorId);
  revalidatePath("/composition-correction");
};
