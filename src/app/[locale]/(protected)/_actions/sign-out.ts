"use server";

import { getLocale } from "next-intl/server";
import { signOut } from "@/auth";

/**
 * サインアウト
 */
export const signOutAction = async () => {
  const locale = await getLocale();
  await signOut({ redirectTo: `/${locale}/login` });
};
