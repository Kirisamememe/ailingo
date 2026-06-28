import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "bun:test";

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("app layout structure", () => {
  test("keeps document-level providers in the root app layout", () => {
    const rootLayout = read("src/app/layout.tsx");

    expect(rootLayout).toContain("<html");
    expect(rootLayout).toContain("<body");
    expect(rootLayout).toContain("ThemeProvider");
    expect(rootLayout).toContain("NextIntlClientProvider");

    for (const path of [
      "src/app/[locale]/(protected)/layout.tsx",
      "src/app/[locale]/login/layout.tsx",
      "src/app/not-found.tsx",
    ]) {
      expect(read(path)).not.toContain("BaseLayout");
    }

    expect(existsSync(join(process.cwd(), "src/app/[locale]/layout.tsx"))).toBe(false);
  });
});
