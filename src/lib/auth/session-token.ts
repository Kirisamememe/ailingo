/* eslint-disable jsdoc/require-jsdoc */

import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE_NAME = "ailingo_session";
export const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;
export const SESSION_REFRESH_AGE_SECONDS = 24 * 60 * 60;

export type CookieMutation = {
  name: string;
  value: string;
  options: Partial<ResponseCookie>;
};

export const generateSessionToken = () => randomBytes(32).toString("base64url");

export const hashSessionToken = (token: string, secret = getAuthSecret()) => {
  return createHmac("sha256", secret).update(token).digest("hex");
};

export const verifySessionTokenHash = (
  token: string,
  expectedHash: string,
  secret = getAuthSecret(),
) => {
  const tokenHash = hashSessionToken(token, secret);
  const tokenHashBuffer = Buffer.from(tokenHash, "hex");
  const expectedHashBuffer = Buffer.from(expectedHash, "hex");

  if (tokenHashBuffer.length !== expectedHashBuffer.length) {
    return false;
  }

  return timingSafeEqual(tokenHashBuffer, expectedHashBuffer);
};

export const getSessionExpiresAt = (now = new Date()) => {
  return new Date(now.getTime() + SESSION_MAX_AGE_SECONDS * 1000);
};

export const isSessionExpired = (expiresAt: Date, now = new Date()) => {
  return expiresAt.getTime() <= now.getTime();
};

export const shouldRefreshSession = (updatedAt: Date, now = new Date()) => {
  return now.getTime() - updatedAt.getTime() >= SESSION_REFRESH_AGE_SECONDS * 1000;
};

export const buildSessionCookie = (token: string, expiresAt: Date): CookieMutation => ({
  name: SESSION_COOKIE_NAME,
  value: token,
  options: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  },
});

export const buildClearSessionCookie = (): CookieMutation => ({
  name: SESSION_COOKIE_NAME,
  value: "",
  options: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  },
});

export const getAuthSecret = () => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is required");
  }
  return secret;
};
