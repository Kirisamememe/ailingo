import "server-only";

/* eslint-disable jsdoc/require-jsdoc */

import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { db } from "@/lib/db";
import { consumeAuthChallenge } from "./challenge";
import { AuthFlowError, ForbiddenError } from "./errors";
import {
  GOOGLE_JWKS_URI,
  GOOGLE_TOKEN_ENDPOINT,
  type GoogleIdTokenPayload,
  assertGoogleIdTokenPayload,
  buildGoogleAuthorizationUrl,
  getAuthBaseUrl,
  getGoogleCredentials,
  getGoogleRedirectUri,
  validateOAuthState,
} from "./oauth";
import { accounts, allowedEmail, users } from "@/drizzle/schema";

type GoogleClaims = GoogleIdTokenPayload & {
  sub: string;
};

type GoogleTokenResponse = {
  access_token?: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  id_token?: string;
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();
const googleJwks = createRemoteJWKSet(new URL(GOOGLE_JWKS_URI));

export const assertAllowedEmail = async (email: string) => {
  const normalizedEmail = normalizeEmail(email);
  const result = await db
    .select()
    .from(allowedEmail)
    .where(eq(allowedEmail.email, normalizedEmail))
    .limit(1);

  if (!result[0]) {
    throw new ForbiddenError("This email is not allowed to sign in");
  }

  return normalizedEmail;
};

export const getGoogleAuthorizationRedirect = async (request: Request) => {
  const { clientId } = getGoogleCredentials();
  const redirectTo = new URL(request.url).searchParams.get("redirectTo") ?? undefined;
  const { state, codeChallenge, nonce } = await createGoogleOAuthChallenge(redirectTo);

  return buildGoogleAuthorizationUrl({
    baseUrl: getAuthBaseUrl(request),
    clientId,
    codeChallenge,
    nonce,
    state,
  });
};

const createGoogleOAuthChallenge = async (redirectTo?: string) => {
  const { createOAuthChallenge } = await import("./challenge");
  return createOAuthChallenge(redirectTo);
};

export const exchangeGoogleCallback = async (request: Request) => {
  const callbackUrl = new URL(request.url);
  const state = callbackUrl.searchParams.get("state");
  const code = callbackUrl.searchParams.get("code");
  const googleError = callbackUrl.searchParams.get("error");

  if (googleError) {
    throw new AuthFlowError(`Google OAuth error: ${googleError}`);
  }

  if (!state) {
    throw new AuthFlowError("Missing OAuth state");
  }

  if (!code) {
    throw new AuthFlowError("Missing OAuth code");
  }

  const challenge = await consumeAuthChallenge(state, "google_oauth");
  if (
    !validateOAuthState(state, challenge.challenge) ||
    !challenge.codeVerifier ||
    !challenge.nonce
  ) {
    throw new AuthFlowError("Invalid OAuth state");
  }

  const { clientId, clientSecret } = getGoogleCredentials();
  const tokens = await exchangeGoogleCode({
    clientId,
    clientSecret,
    code,
    codeVerifier: challenge.codeVerifier,
    redirectUri: getGoogleRedirectUri(getAuthBaseUrl(request)),
  });
  const claims = await verifyGoogleIdToken({
    clientId,
    idToken: tokens.id_token,
    nonce: challenge.nonce,
  });

  return {
    claims,
    tokens,
    redirectTo: challenge.redirectTo,
  };
};

export const findOrCreateGoogleUser = async (claims: GoogleClaims, tokens: GoogleTokenResponse) => {
  const sub = claims.sub;
  const rawEmail = typeof claims.email === "string" ? claims.email : undefined;
  const emailVerified = claims.email_verified === true;

  if (!sub || !rawEmail || !emailVerified) {
    throw new AuthFlowError("Google account email must be verified");
  }

  const email = await assertAllowedEmail(rawEmail);
  const accountResult = await db
    .select()
    .from(accounts)
    .where(eq(accounts.providerAccountId, sub))
    .limit(1);
  const existingAccount = accountResult.find((account) => account.provider === "google");

  if (existingAccount) {
    await updateGoogleAccount(existingAccount.userId, sub, tokens);
    return existingAccount.userId;
  }

  const userResult = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const userId = userResult[0]?.id ?? randomUUID();
  const now = new Date();

  if (!userResult[0]) {
    await db.insert(users).values({
      id: userId,
      email,
      name: typeof claims.name === "string" ? claims.name : "Anonymous",
      image: typeof claims.picture === "string" ? claims.picture : null,
      emailVerified: now,
      createdAt: now,
      updatedAt: now,
    });
  } else {
    await db
      .update(users)
      .set({
        name: typeof claims.name === "string" ? claims.name : userResult[0].name,
        image: typeof claims.picture === "string" ? claims.picture : userResult[0].image,
        emailVerified: userResult[0].emailVerified ?? now,
        updatedAt: now,
      })
      .where(eq(users.id, userId));
  }

  await db.insert(accounts).values({
    userId,
    type: "oidc",
    provider: "google",
    providerAccountId: sub,
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expires_at: tokens.expires_in ? Math.floor(Date.now() / 1000) + tokens.expires_in : null,
    token_type: tokens.token_type,
    scope: tokens.scope,
    id_token: tokens.id_token,
  });

  return userId;
};

const updateGoogleAccount = async (
  userId: string,
  providerAccountId: string,
  tokens: GoogleTokenResponse,
) => {
  await db
    .update(accounts)
    .set({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: tokens.expires_in ? Math.floor(Date.now() / 1000) + tokens.expires_in : null,
      token_type: tokens.token_type,
      scope: tokens.scope,
      id_token: tokens.id_token,
    })
    .where(eq(accounts.providerAccountId, providerAccountId));

  await db.update(users).set({ updatedAt: new Date() }).where(eq(users.id, userId));
};

const exchangeGoogleCode = async ({
  clientId,
  clientSecret,
  code,
  codeVerifier,
  redirectUri,
}: {
  clientId: string;
  clientSecret: string;
  code: string;
  codeVerifier: string;
  redirectUri: string;
}) => {
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    code,
    code_verifier: codeVerifier,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
  });
  const response = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const payload = await response.json().catch(() => undefined);

  if (!response.ok) {
    throw new AuthFlowError("Google token exchange failed");
  }

  if (!isRecord(payload)) {
    throw new AuthFlowError("Google token response was invalid");
  }

  const tokens: GoogleTokenResponse = {
    access_token: typeof payload.access_token === "string" ? payload.access_token : undefined,
    expires_in: typeof payload.expires_in === "number" ? payload.expires_in : undefined,
    refresh_token: typeof payload.refresh_token === "string" ? payload.refresh_token : undefined,
    scope: typeof payload.scope === "string" ? payload.scope : undefined,
    token_type: typeof payload.token_type === "string" ? payload.token_type : undefined,
    id_token: typeof payload.id_token === "string" ? payload.id_token : undefined,
  };

  if (!tokens.id_token) {
    throw new AuthFlowError("Google did not return an ID token");
  }

  return tokens;
};

const verifyGoogleIdToken = async ({
  clientId,
  idToken,
  nonce,
}: {
  clientId: string;
  idToken?: string;
  nonce: string;
}) => {
  if (!idToken) {
    throw new AuthFlowError("Google did not return an ID token");
  }

  let payload: GoogleIdTokenPayload;
  try {
    const verified = await jwtVerify(idToken, googleJwks, {
      audience: clientId,
    });
    payload = verified.payload;
  } catch {
    throw new AuthFlowError("Google ID token verification failed");
  }

  try {
    return assertGoogleIdTokenPayload(payload, nonce) as GoogleClaims;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid Google ID token";
    throw new AuthFlowError(message);
  }
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};
