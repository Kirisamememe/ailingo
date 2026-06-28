"use client";

/* eslint-disable jsdoc/require-jsdoc */

import { useState } from "react";
import { startRegistration } from "@simplewebauthn/browser";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";

type PasskeyRegistrationOptionsResponse = {
  challengeId: string;
  options: Parameters<typeof startRegistration>[0]["optionsJSON"];
};

export const PasskeyRegistration = () => {
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const register = async () => {
    setMessage("");
    setIsPending(true);

    try {
      const optionsResponse = await fetch("/api/auth/passkey/register/options");

      if (!optionsResponse.ok) {
        throw new Error("Could not start passkey registration.");
      }

      const { challengeId, options } =
        (await optionsResponse.json()) as PasskeyRegistrationOptionsResponse;
      const response = await startRegistration({ optionsJSON: options });
      const verifyResponse = await fetch("/api/auth/passkey/register/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ challengeId, response }),
      });

      if (!verifyResponse.ok) {
        throw new Error("Could not verify the passkey.");
      }

      setMessage("Passkey registered.");
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : "Passkey registration failed.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <Button type="button" variant="outline" onClick={register} disabled={isPending}>
        <KeyRound />
        {isPending ? "Registering Passkey" : "Register Passkey"}
      </Button>
      {message && <p className="text-muted-foreground text-sm">{message}</p>}
    </div>
  );
};
