import "server-only";

/* eslint-disable jsdoc/require-jsdoc */

import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";
import { and, eq } from "drizzle-orm";
import { getLocale } from "next-intl/server";
import { db } from "@/lib/db";
import {
  buildClearSessionCookie,
  buildSessionCookie,
  getSessionTokenFromCookieStore,
  getSessionTokenFromRequest,
  setCookieMutation,
} from "./cookies";
import { ForbiddenError, UnauthorizedError } from "./errors";
import {
  generateSessionToken,
  getSessionExpiresAt,
  hashSessionToken,
  isSessionExpired,
  shouldRefreshSession,
} from "./session-token";
import type { AppSession } from "./types";
import { authSession, users } from "@/drizzle/schema";
import { redirect } from "@/i18n";

const getRequestIp = (request: Request) => {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    null
  );
};

const toAppSession = (data: {
  sessionId: string;
  user: typeof users.$inferSelect;
}): AppSession => ({
  sessionId: data.sessionId,
  operatorId: data.user.id,
  user: {
    id: data.user.id,
    email: data.user.email,
    role: data.user.role,
    name: data.user.name,
    image: data.user.image ?? "",
    emailVerified: data.user.emailVerified,
  },
});

const resolveSessionToken = async (token: string | undefined, now = new Date()) => {
  if (!token) {
    return null;
  }

  const tokenHash = hashSessionToken(token);
  const result = await db
    .select({
      session: authSession,
      user: users,
    })
    .from(authSession)
    .innerJoin(users, eq(authSession.userId, users.id))
    .where(eq(authSession.tokenHash, tokenHash))
    .limit(1);

  const data = result.length ? result[0] : undefined;
  if (!data) {
    return null;
  }

  if (isSessionExpired(data.session.expiresAt, now)) {
    await db.delete(authSession).where(eq(authSession.id, data.session.id));
    return null;
  }

  let refreshedExpiresAt: Date | undefined;
  if (shouldRefreshSession(data.session.updatedAt, now)) {
    refreshedExpiresAt = getSessionExpiresAt(now);
    await db
      .update(authSession)
      .set({
        expiresAt: refreshedExpiresAt,
        updatedAt: now,
      })
      .where(eq(authSession.id, data.session.id));
  }

  return {
    refreshedExpiresAt,
    session: toAppSession({
      sessionId: data.session.id,
      user: data.user,
    }),
  };
};

export const getSessionFromRequest = async (request: Request) => {
  return (await resolveSessionToken(getSessionTokenFromRequest(request)))?.session ?? null;
};

export const getOptionalSession = async () => {
  const cookieStore = await cookies();
  const token = getSessionTokenFromCookieStore(cookieStore);
  const resolvedSession = await resolveSessionToken(token);

  if (token && resolvedSession?.refreshedExpiresAt) {
    setCookieMutation(cookieStore, buildSessionCookie(token, resolvedSession.refreshedExpiresAt));
  }

  return resolvedSession?.session ?? null;
};

export const requireSession = async (request?: Request) => {
  const session = request ? await getSessionFromRequest(request) : await getOptionalSession();

  if (!session) {
    throw new UnauthorizedError();
  }

  if (session.user.role === "BLOCKED") {
    throw new ForbiddenError();
  }

  return session;
};

export const getSession = async () => {
  const locale = await getLocale();
  const session = await getOptionalSession();

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
};

export const createSession = async (userId: string, request: Request, now = new Date()) => {
  const token = generateSessionToken();
  const expiresAt = getSessionExpiresAt(now);
  const tokenHash = hashSessionToken(token);

  await db.insert(authSession).values({
    id: randomUUID(),
    tokenHash,
    userId,
    expiresAt,
    createdAt: now,
    updatedAt: now,
    ipAddress: getRequestIp(request),
    userAgent: request.headers.get("user-agent"),
  });

  return {
    token,
    expiresAt,
  };
};

export const destroySessionByToken = async (token: string | undefined) => {
  if (!token) {
    return;
  }

  const tokenHash = hashSessionToken(token);
  await db.delete(authSession).where(eq(authSession.tokenHash, tokenHash));
};

export const destroySession = async () => {
  const cookieStore = await cookies();
  await destroySessionByToken(getSessionTokenFromCookieStore(cookieStore));
  setCookieMutation(cookieStore, buildClearSessionCookie());
};

export const deleteUserSessions = async (userId: string) => {
  await db.delete(authSession).where(and(eq(authSession.userId, userId)));
};
