import "server-only";

import { getLocale } from "next-intl/server";
import { auth } from "@/auth";
import { redirect } from "@/i18n";

/**
 * Get authenticated session
 */
export async function getSession() {
  const locale = await getLocale();
  const session = await auth();
  // FIXME: リダイレクトのロジックを見直す
  if (!session) {
    return redirect({ href: "/login", locale });
  }

  if (session.user.role === "BLOCKED") {
    return redirect({ href: "http://localhost:9999", locale });
  }

  return {
    user: session.user,
    operatorId: session.operatorId,
  };
}
