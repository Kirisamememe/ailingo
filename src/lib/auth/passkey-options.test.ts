import { describe, expect, test } from "bun:test";
import { buildPasskeyAuthenticationOptions } from "./passkey-options";

describe("passkey authentication options", () => {
  test("omits allowCredentials for discoverable passkey login", async () => {
    const options = await buildPasskeyAuthenticationOptions({ rpID: "localhost" });

    expect(options.rpId).toBe("localhost");
    expect(options.allowCredentials).toBeUndefined();
  });

  test("includes allowCredentials only for explicit credential filtering", async () => {
    const options = await buildPasskeyAuthenticationOptions({
      rpID: "localhost",
      credentials: [
        {
          id: "credential-id",
          transports: ["internal"],
        },
      ],
    });

    expect(options.allowCredentials).toEqual([
      {
        id: "credential-id",
        type: "public-key",
        transports: ["internal"],
      },
    ]);
  });
});
