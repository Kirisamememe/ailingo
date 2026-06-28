"use server";

import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { destroySession } from "@/lib/auth";

/**
 * サインアウト
 */
export const signOutAction = async () => {
  const locale = await getLocale();
  await destroySession();
  redirect(`/${locale}/login`);
};
