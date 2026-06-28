import "server-only";

/* eslint-disable jsdoc/require-jsdoc */

import { Buffer } from "node:buffer";
import { randomBytes } from "node:crypto";
import {
  type AuthenticationResponseJSON,
  type AuthenticatorTransportFuture,
  type RegistrationResponseJSON,
  type WebAuthnCredential,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { consumeAuthChallenge, createAuthChallenge } from "./challenge";
import { AuthFlowError, ForbiddenError } from "./errors";
import { getAuthBaseUrl } from "./oauth";
import { buildPasskeyAuthenticationOptions } from "./passkey-options";
import type { AppSession } from "./types";
import { passkey } from "@/drizzle/schema";

type PasskeyRegistrationBody = {
  challengeId: string;
  response: RegistrationResponseJSON;
  name?: string;
};

type PasskeyAuthenticationBody = {
  challengeId: string;
  response: AuthenticationResponseJSON;
};

const toBase64Url = (bytes: Uint8Array) => Buffer.from(bytes).toString("base64url");
const fromBase64Url = (value: string) => Uint8Array.from(Buffer.from(value, "base64url"));

export const getPasskeyConfig = (request: Request) => {
  const baseUrl = getAuthBaseUrl(request);
  const origin = process.env.PASSKEY_ORIGIN ?? baseUrl;
  const rpID = process.env.PASSKEY_RP_ID ?? new URL(origin).hostname;

  return {
    rpName: "Ailingo",
    rpID,
    origin,
  };
};

export const startPasskeyRegistration = async (session: AppSession, request: Request) => {
  const { rpName, rpID } = getPasskeyConfig(request);
  const existingPasskeys = await db
    .select()
    .from(passkey)
    .where(eq(passkey.userId, session.operatorId));
  const webauthnUserId = randomBytes(32).toString("base64url");

  const options = await generateRegistrationOptions({
    rpName,
    rpID,
    userID: fromBase64Url(webauthnUserId),
    userName: session.user.email,
    userDisplayName: session.user.name ?? session.user.email,
    attestationType: "none",
    excludeCredentials: existingPasskeys.map((credential) => ({
      id: credential.id,
      transports: credential.transports as AuthenticatorTransportFuture[] | undefined,
    })),
    authenticatorSelection: {
      residentKey: "required",
      userVerification: "preferred",
    },
  });

  await createAuthChallenge({
    id: options.challenge,
    type: "passkey_registration",
    challenge: options.challenge,
    codeVerifier: webauthnUserId,
    userId: session.operatorId,
  });

  return {
    challengeId: options.challenge,
    options,
  };
};

export const verifyPasskeyRegistration = async (
  session: AppSession,
  request: Request,
  body: PasskeyRegistrationBody,
) => {
  const challenge = await consumeAuthChallenge(body.challengeId, "passkey_registration");
  if (challenge.userId !== session.operatorId || !challenge.codeVerifier) {
    throw new AuthFlowError("Invalid passkey registration challenge");
  }

  const { rpID, origin } = getPasskeyConfig(request);
  const verification = await verifyRegistrationResponse({
    response: body.response,
    expectedChallenge: challenge.challenge,
    expectedOrigin: origin,
    expectedRPID: rpID,
  });

  if (!verification.verified) {
    throw new AuthFlowError("Passkey registration failed");
  }

  const { credential, credentialDeviceType, credentialBackedUp } = verification.registrationInfo;
  const now = new Date();

  const passkeyName = body.name?.trim();

  await db.insert(passkey).values({
    id: credential.id,
    userId: session.operatorId,
    webauthnUserId: challenge.codeVerifier,
    publicKey: toBase64Url(credential.publicKey),
    counter: credential.counter,
    deviceType: credentialDeviceType,
    backedUp: credentialBackedUp,
    transports: credential.transports,
    name: passkeyName ?? null,
    createdAt: now,
    updatedAt: now,
  });

  return { verified: true };
};

export const startPasskeyAuthentication = async (request: Request) => {
  const { rpID } = getPasskeyConfig(request);
  const options = await buildPasskeyAuthenticationOptions({
    rpID,
  });

  await createAuthChallenge({
    id: options.challenge,
    type: "passkey_authentication",
    challenge: options.challenge,
  });

  return {
    challengeId: options.challenge,
    options,
  };
};

export const verifyPasskeyAuthentication = async (
  request: Request,
  body: PasskeyAuthenticationBody,
) => {
  const challenge = await consumeAuthChallenge(body.challengeId, "passkey_authentication");
  const credentialResult = await db
    .select()
    .from(passkey)
    .where(eq(passkey.id, body.response.id))
    .limit(1);
  const storedCredential = credentialResult.length ? credentialResult[0] : undefined;

  if (!storedCredential) {
    throw new ForbiddenError("Passkey is not registered for this user");
  }

  const { rpID, origin } = getPasskeyConfig(request);
  const credential: WebAuthnCredential = {
    id: storedCredential.id,
    publicKey: fromBase64Url(storedCredential.publicKey),
    counter: storedCredential.counter,
    transports: storedCredential.transports as AuthenticatorTransportFuture[] | undefined,
  };
  const verification = await verifyAuthenticationResponse({
    response: body.response,
    expectedChallenge: challenge.challenge,
    expectedOrigin: origin,
    expectedRPID: rpID,
    credential,
  });

  if (!verification.verified) {
    throw new AuthFlowError("Passkey authentication failed");
  }

  await db
    .update(passkey)
    .set({
      counter: verification.authenticationInfo.newCounter,
      backedUp: verification.authenticationInfo.credentialBackedUp,
      deviceType: verification.authenticationInfo.credentialDeviceType,
      updatedAt: new Date(),
      lastUsedAt: new Date(),
    })
    .where(eq(passkey.id, storedCredential.id));

  return {
    verified: true,
    userId: storedCredential.userId,
  };
};
