import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

/**
 * Get authenticated session
 */
export async function getSession() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return {
    user: session.user,
  };
}
