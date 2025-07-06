import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

/**
 * Get authenticated session
 */
export async function getSession() {
  const session = await auth();
  // FIXME: リダイレクトのロジックを見直す
  if (!session) {
    return redirect("/login");
  }

  if (session.user.role === "BLOCKED") {
    return redirect("http://localhost:9999");
  }

  return {
    user: session.user,
    operatorId: session.operatorId,
  };
}
