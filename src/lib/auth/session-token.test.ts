import { describe, expect, test } from "bun:test";
import {
  SESSION_COOKIE_NAME,
  buildClearSessionCookie,
  buildSessionCookie,
  generateSessionToken,
  hashSessionToken,
  isSessionExpired,
  shouldRefreshSession,
} from "./session-token";

describe("session tokens", () => {
  test("generates opaque high-entropy URL-safe tokens", () => {
    const token = generateSessionToken();

    expect(token.length).toBeGreaterThanOrEqual(43);
    expect(token).toMatch(/^[A-Za-z0-9_-]+$/);
  });

  test("hashes a token with the configured secret without storing the raw value", () => {
    const hash = hashSessionToken("session-token", "auth-secret");

    expect(hash).not.toContain("session-token");
    expect(hash).toHaveLength(64);
    expect(hashSessionToken("session-token", "auth-secret")).toBe(hash);
    expect(hashSessionToken("session-token", "other-secret")).not.toBe(hash);
  });

  test("builds secure session and clearing cookie options", () => {
    const expiresAt = new Date("2026-06-28T00:00:00.000Z");
    const cookie = buildSessionCookie("token", expiresAt);
    const clearCookie = buildClearSessionCookie();

    expect(cookie.name).toBe(SESSION_COOKIE_NAME);
    expect(cookie.value).toBe("token");
    expect(cookie.options.httpOnly).toBe(true);
    expect(cookie.options.sameSite).toBe("lax");
    expect(cookie.options.path).toBe("/");
    expect(cookie.options.expires).toEqual(expiresAt);

    expect(clearCookie.name).toBe(SESSION_COOKIE_NAME);
    expect(clearCookie.value).toBe("");
    expect(clearCookie.options.maxAge).toBe(0);
  });

  test("classifies expired and refreshable sessions", () => {
    const now = new Date("2026-06-21T00:00:00.000Z");

    expect(isSessionExpired(new Date("2026-06-20T23:59:59.000Z"), now)).toBe(true);
    expect(isSessionExpired(new Date("2026-06-21T00:00:01.000Z"), now)).toBe(false);
    expect(shouldRefreshSession(new Date("2026-06-19T23:59:59.000Z"), now)).toBe(true);
    expect(shouldRefreshSession(new Date("2026-06-20T12:00:00.000Z"), now)).toBe(false);
  });
});
