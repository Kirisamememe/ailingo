/* eslint-disable jsdoc/require-jsdoc */

export const GOOGLE_AUTHORIZATION_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
export const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
export const GOOGLE_ISSUER = "https://accounts.google.com";
export const GOOGLE_JWKS_URI = "https://www.googleapis.com/oauth2/v3/certs";
export const GOOGLE_CALLBACK_PATH = "/api/auth/google/callback";

export type GoogleIdTokenPayload = {
  iss?: unknown;
  sub?: unknown;
  nonce?: unknown;
  email?: unknown;
  email_verified?: unknown;
  name?: unknown;
  picture?: unknown;
};

type AuthEnv = Record<string, string | undefined>;

type GoogleAuthorizationUrlInput = {
  baseUrl: string;
  clientId: string;
  codeChallenge: string;
  nonce: string;
  state: string;
};

export const getGoogleCredentials = (env: AuthEnv = process.env) => {
  const clientId = env.GOOGLE_CLIENT_ID ?? env.AUTH_GOOGLE_ID;
  const clientSecret = env.GOOGLE_CLIENT_SECRET ?? env.AUTH_GOOGLE_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET are required");
  }

  return { clientId, clientSecret };
};

export const getAuthBaseUrl = (request: Request, env: AuthEnv = process.env) => {
  if (env.AUTH_BASE_URL) {
    return env.AUTH_BASE_URL.replace(/\/$/, "");
  }

  if (env.AUTH_TRUST_HOST === "true") {
    const proto = request.headers.get("x-forwarded-proto");
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");

    if (proto && host) {
      return `${proto}://${host}`;
    }
  }

  return new URL(request.url).origin;
};

export const getGoogleRedirectUri = (baseUrl: string) => {
  return `${baseUrl.replace(/\/$/, "")}${GOOGLE_CALLBACK_PATH}`;
};

export const buildGoogleAuthorizationUrl = ({
  baseUrl,
  clientId,
  codeChallenge,
  nonce,
  state,
}: GoogleAuthorizationUrlInput) => {
  const url = new URL(GOOGLE_AUTHORIZATION_ENDPOINT);

  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", getGoogleRedirectUri(baseUrl));
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("state", state);
  url.searchParams.set("nonce", nonce);
  url.searchParams.set("code_challenge", codeChallenge);
  url.searchParams.set("code_challenge_method", "S256");
  url.searchParams.set("prompt", "select_account");

  return url;
};

export const validateOAuthState = (state: string | null, expectedState: string) => {
  return typeof state === "string" && state.length > 0 && state === expectedState;
};

export const assertGoogleIdTokenPayload = (
  payload: GoogleIdTokenPayload,
  expectedNonce: string,
) => {
  if (payload.iss !== GOOGLE_ISSUER && payload.iss !== "accounts.google.com") {
    throw new Error("Invalid Google ID token issuer");
  }

  if (typeof payload.sub !== "string" || payload.sub.length === 0) {
    throw new Error("Invalid Google ID token subject");
  }

  if (payload.nonce !== expectedNonce) {
    throw new Error("Invalid Google ID token nonce");
  }

  return payload;
};
