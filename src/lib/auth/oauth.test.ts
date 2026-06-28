import { describe, expect, test } from "bun:test";
import {
  GOOGLE_ISSUER,
  assertGoogleIdTokenPayload,
  buildGoogleAuthorizationUrl,
  getAuthBaseUrl,
  getGoogleCredentials,
  validateOAuthState,
} from "./oauth";

describe("oauth helpers", () => {
  test("uses new Google env names and falls back to legacy Auth.js names", () => {
    expect(
      getGoogleCredentials({
        GOOGLE_CLIENT_ID: "new-id",
        GOOGLE_CLIENT_SECRET: "new-secret",
        AUTH_GOOGLE_ID: "old-id",
        AUTH_GOOGLE_SECRET: "old-secret",
      }),
    ).toEqual({ clientId: "new-id", clientSecret: "new-secret" });

    expect(
      getGoogleCredentials({
        AUTH_GOOGLE_ID: "old-id",
        AUTH_GOOGLE_SECRET: "old-secret",
      }),
    ).toEqual({ clientId: "old-id", clientSecret: "old-secret" });
  });

  test("builds an authorization URL with OIDC code flow parameters", () => {
    const url = buildGoogleAuthorizationUrl({
      baseUrl: "https://app.example.com",
      clientId: "client-id",
      codeChallenge: "challenge",
      nonce: "nonce-value",
      state: "state",
    });

    expect(url.origin).toBe("https://accounts.google.com");
    expect(url.searchParams.get("client_id")).toBe("client-id");
    expect(url.searchParams.get("redirect_uri")).toBe(
      "https://app.example.com/api/auth/google/callback",
    );
    expect(url.searchParams.get("response_type")).toBe("code");
    expect(url.searchParams.get("scope")).toBe("openid email profile");
    expect(url.searchParams.get("nonce")).toBe("nonce-value");
    expect(url.searchParams.get("code_challenge_method")).toBe("S256");
    expect(url.searchParams.get("prompt")).toBe("select_account");
  });

  test("validates state against a stored challenge", () => {
    expect(validateOAuthState("from-query", "from-query")).toBe(true);
    expect(validateOAuthState("from-query", "other")).toBe(false);
    expect(validateOAuthState(null, "from-query")).toBe(false);
  });

  test("uses forwarded headers when trust host is enabled", () => {
    const request = new Request("http://localhost:3222/path", {
      headers: {
        "x-forwarded-proto": "https",
        "x-forwarded-host": "ailingo.example.com",
      },
    });

    expect(getAuthBaseUrl(request, { AUTH_TRUST_HOST: "true" })).toBe(
      "https://ailingo.example.com",
    );
    expect(getAuthBaseUrl(request, { AUTH_BASE_URL: "https://configured.example.com" })).toBe(
      "https://configured.example.com",
    );
  });

  test("accepts Google ID token payloads only when issuer, subject, and nonce are valid", () => {
    expect(
      assertGoogleIdTokenPayload(
        {
          iss: GOOGLE_ISSUER,
          sub: "google-sub",
          nonce: "nonce-value",
        },
        "nonce-value",
      ),
    ).toEqual({
      iss: GOOGLE_ISSUER,
      sub: "google-sub",
      nonce: "nonce-value",
    });

    expect(() =>
      assertGoogleIdTokenPayload(
        {
          iss: GOOGLE_ISSUER,
          sub: "google-sub",
          nonce: "other",
        },
        "nonce-value",
      ),
    ).toThrow("Invalid Google ID token nonce");

    expect(() =>
      assertGoogleIdTokenPayload(
        {
          iss: "https://example.com",
          sub: "google-sub",
          nonce: "nonce-value",
        },
        "nonce-value",
      ),
    ).toThrow("Invalid Google ID token issuer");
  });
});
