import { describe, expect, test } from "bun:test";
import { getAuthRouteDecision, getPreferredLocale } from "./route-policy";

describe("auth route policy", () => {
  test("allows public login routes and redirects logged-in users away from them", () => {
    expect(getAuthRouteDecision("/en/login", false)).toEqual({ kind: "allow" });
    expect(getAuthRouteDecision("/en/login", true)).toEqual({
      kind: "redirect",
      location: "/en/home",
    });
  });

  test("redirects protected localized pages to their locale login page", () => {
    expect(getAuthRouteDecision("/ja/home", false)).toEqual({
      kind: "redirect",
      location: "/ja/login",
    });
    expect(getAuthRouteDecision("/zh-CN/wordbook", true)).toEqual({ kind: "allow" });
  });

  test("treats unknown and root-like routes as public for i18n negotiation", () => {
    expect(getAuthRouteDecision("/", false)).toEqual({ kind: "allow" });
    expect(getAuthRouteDecision("/favicon.ico", false)).toEqual({ kind: "allow" });
  });

  test("extracts locale preference from localized paths", () => {
    expect(getPreferredLocale("/ja/login")).toBe("ja");
    expect(getPreferredLocale("/unknown/path")).toBe("en");
  });
});
