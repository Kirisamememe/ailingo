import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "bun:test";

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("passkey registration route", () => {
  test("exposes passkey registration from authenticated user menus", () => {
    expect(read("src/app/[locale]/(protected)/preference/page.tsx")).toContain(
      "PasskeyRegistration",
    );

    for (const path of [
      "src/app/[locale]/(protected)/_components/nav/nav-avatar.tsx",
      "src/app/[locale]/(protected)/_components/nav/sidebar/sidenav-footer.tsx",
    ]) {
      const content = read(path);
      expect(content).toContain('href="/preference"');
      expect(content).toContain("passkey");
    }
  });
});
