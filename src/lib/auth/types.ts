/* eslint-disable jsdoc/require-jsdoc */

import type { Role } from "@/types";

export type AppAuthUser = {
  id: string;
  email: string;
  role: Role;
  name?: string;
  image?: string;
  emailVerified?: Date | null;
};

export type AppSession = {
  sessionId: string;
  operatorId: string;
  user: AppAuthUser;
};
