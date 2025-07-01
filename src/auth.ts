import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/db/prisma";
import { authConfig } from "./auth.config";
import type { Role } from "@/generated/prisma";
import { userService } from "@/services";

declare module "next-auth" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Session {
    operatorId: string;
    user: {
      email?: string;
      role: Role;
      name?: string;
      image?: string;
    };
  }

  type JWT = {
    absoluteExp: number;
  };
}

/**
 * Auth
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  callbacks: {
    async session({ session, token }) {
      // JWTの加工が完了すると、ここでセッションに入れられる
      if (!token.email) {
        return { ...session, user: { role: "BLOCKED", email: "" } };
      }

      const data = await userService.getUserByEmail(token.email);
      if (!data) {
        return { ...session, user: { role: "BLOCKED", email: "" } };
      }

      return {
        ...session,
        operatorId: data.id,
        user: {
          id: data.id,
          email: data.email,
          name: data.name,
          role: data.role,
          image: data.image ?? "",
          emailVerified: data.emailVerified ?? null,
        },
      };
    },
  },
});
