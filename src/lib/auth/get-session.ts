import "server-only";
import { getLocale } from "next-intl/server";
import { auth } from "@/auth";
import { redirect } from "@/i18n";

/**
 * Get authenticated session
 */
export async function getSession() {
  const session = await auth();
  const locale = await getLocale();
  // FIXME: リダイレクトのロジックを見直す
  if (!session?.user || session.user.role === "BLOCKED") {
    return redirect({ href: "/login", locale });
  }

  return {
    user: session.user,
    operatorId: session.operatorId,
  };
}
