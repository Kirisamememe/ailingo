"use server";

import { getSession } from "@/lib/auth";

/**
 * オペレーターIDを取得
 */
export const getOperatorId = async () => {
  const { operatorId } = await getSession();
  return operatorId;
};
