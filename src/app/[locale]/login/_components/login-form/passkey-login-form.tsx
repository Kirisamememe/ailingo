"use client";

/* eslint-disable jsdoc/require-jsdoc */

import { useCallback, useEffect, useRef, useState } from "react";
import { browserSupportsWebAuthnAutofill, startAuthentication } from "@simplewebauthn/browser";
import { LoaderCircle } from "lucide-react";

type PasskeyOptionsResponse = {
  challengeId: string;
  options: Parameters<typeof startAuthentication>[0]["optionsJSON"];
};

export const PasskeyLoginForm = () => {
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const autofillStartedRef = useRef(false);

  const redirectAfterLogin = useCallback(() => {
    const [, locale] = window.location.pathname.split("/");
    window.location.assign(locale ? `/${locale}/home` : "/home");
  }, []);

  const getPasskeyOptions = useCallback(async () => {
    const optionsResponse = await fetch("/api/auth/passkey/login/options", {
      method: "POST",
    });

    if (!optionsResponse.ok) {
      throw new Error("Passkey is not available.");
    }

    return (await optionsResponse.json()) as PasskeyOptionsResponse;
  }, []);

  const verifyPasskey = useCallback(
    async ({
      challengeId,
      response,
    }: {
      challengeId: string;
      response: Awaited<ReturnType<typeof startAuthentication>>;
    }) => {
      setIsVerifying(true);

      try {
        const verifyResponse = await fetch("/api/auth/passkey/login/verify", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ challengeId, response }),
        });

        if (!verifyResponse.ok) {
          throw new Error("Passkey verification failed.");
        }

        redirectAfterLogin();
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Passkey login failed.");
        throw caught;
      } finally {
        setIsVerifying(false);
      }
    },
    [redirectAfterLogin],
  );

  useEffect(() => {
    if (autofillStartedRef.current) {
      return;
    }

    autofillStartedRef.current = true;
    let active = true;

    const startAutofill = async () => {
      if (!(await browserSupportsWebAuthnAutofill())) {
        return;
      }

      try {
        const { challengeId, options } = await getPasskeyOptions();
        const response = await startAuthentication({
          optionsJSON: options,
          useBrowserAutofill: true,
        });

        if (active) {
          await verifyPasskey({ challengeId, response });
        }
      } catch {
        // Conditional UI may be cancelled by the browser or by a manual passkey attempt.
      }
    };

    void startAutofill();

    return () => {
      active = false;
    };
  }, [getPasskeyOptions, verifyPasskey]);

  return (
    <div className="space-y-3">
      {isVerifying ? (
        <div
          role="status"
          aria-live="polite"
          className="border-input bg-background text-muted-foreground flex h-9 w-full items-center gap-2 rounded-md border px-3 text-sm"
        >
          <LoaderCircle className="size-4 animate-spin" />
          <span>Checking passkey</span>
        </div>
      ) : (
        <input
          type="text"
          name="username"
          autoComplete="username webauthn"
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-9 w-full rounded-md border px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          placeholder="Select a passkey"
          aria-label="Select a passkey"
        />
      )}
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
};
