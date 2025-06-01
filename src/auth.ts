import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { authConfig } from "./auth.config";
// import type { Role } from "./types";
import prisma from "@/prisma";
// import { allowedEmailService, userService } from "./di/services";
// import type { Role } from "./types/schema-editor";

declare module "next-auth" {
  // type Session = {
  //   operatorId: number;
  //   user: {
  //     email?: string;
  //     role: Role;
  //     name?: string;
  //     image?: string;
  //     nickname?: string;
  //   };
  // };

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
    signIn({ user }) {
      // providerから認証成功のオブジェクトが返却されると、まずここに来る
      const { email } = user;
      if (!email) {
        console.error("User email is missing");
        return false;
      }

      return true;
    },
    session({ session }) {
      // JWTの加工が完了すると、ここでセッションに入れられる

      // const { email, name } = token as {
      //   email: string;
      //   name: string;
      //   nickname: string;
      //   role: Role;
      // };
      // const { user } = session;

      console.log(`---- session実行 ${new Date().toISOString()} -----`);

      // if (!data) return;

      // session = {
      //   ...session,
      //   operatorId: data.id,
      //   user: {
      //     ...user,
      //     email,
      //     name,
      //     role: data.role,
      //     nickname: data.nickname || "",
      //     image: data.image || "",
      //   },
      // };

      return session;
    },
  },
});
