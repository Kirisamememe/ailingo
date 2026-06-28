import "server-only";

/* eslint-disable jsdoc/require-jsdoc */

import { createHash, randomBytes, randomUUID } from "node:crypto";
import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/lib/db";
import { AuthFlowError } from "./errors";
import { type AuthChallengeType, authChallenge } from "@/drizzle/schema";

const DEFAULT_CHALLENGE_TTL_SECONDS = 10 * 60;

type CreateChallengeInput = {
  type: AuthChallengeType;
  challenge: string;
  id?: string;
  codeVerifier?: string;
  nonce?: string;
  redirectTo?: string;
  email?: string;
  userId?: string;
  ttlSeconds?: number;
};

export const getChallengeExpiresAt = (
  ttlSeconds = DEFAULT_CHALLENGE_TTL_SECONDS,
  now = new Date(),
) => new Date(now.getTime() + ttlSeconds * 1000);

export const createAuthChallenge = async ({
  type,
  challenge,
  id = randomUUID(),
  codeVerifier,
  nonce,
  redirectTo,
  email,
  userId,
  ttlSeconds,
}: CreateChallengeInput) => {
  await db.insert(authChallenge).values({
    id,
    type,
    challenge,
    codeVerifier,
    nonce,
    redirectTo,
    email,
    userId,
    expiresAt: getChallengeExpiresAt(ttlSeconds),
  });

  return id;
};

const generateRandomOAuthValue = () => randomBytes(32).toString("base64url");

const calculatePKCECodeChallenge = (codeVerifier: string) =>
  createHash("sha256").update(codeVerifier).digest("base64url");

export const createOAuthChallenge = async (redirectTo?: string) => {
  const state = generateRandomOAuthValue();
  const codeVerifier = generateRandomOAuthValue();
  const codeChallenge = calculatePKCECodeChallenge(codeVerifier);
  const nonce = generateRandomOAuthValue();

  await createAuthChallenge({
    id: state,
    type: "google_oauth",
    challenge: state,
    codeVerifier,
    nonce,
    redirectTo,
  });

  return {
    state,
    codeVerifier,
    codeChallenge,
    nonce,
  };
};

export const consumeAuthChallenge = async (id: string, type: AuthChallengeType) => {
  const result = await db
    .select()
    .from(authChallenge)
    .where(
      and(eq(authChallenge.id, id), eq(authChallenge.type, type), isNull(authChallenge.consumedAt)),
    )
    .limit(1);

  const challenge = result.length ? result[0] : undefined;
  if (!challenge) {
    throw new AuthFlowError("Invalid auth challenge");
  }

  if (challenge.expiresAt.getTime() <= Date.now()) {
    throw new AuthFlowError("Expired auth challenge");
  }

  await db
    .update(authChallenge)
    .set({ consumedAt: new Date() })
    .where(eq(authChallenge.id, challenge.id));

  return challenge;
};
