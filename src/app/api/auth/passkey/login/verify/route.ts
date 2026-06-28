/* eslint-disable jsdoc/require-jsdoc */

import { type NextRequest, NextResponse } from "next/server";
import { AuthFlowError, ForbiddenError } from "@/lib/auth";
import { buildSessionCookie, setResponseCookie } from "@/lib/auth/cookies";
import { verifyPasskeyAuthentication } from "@/lib/auth/passkey";
import { createSession } from "@/lib/auth/session";

export const POST = async (request: NextRequest) => {
  const body: unknown = await request.json();

  try {
    const verification = await verifyPasskeyAuthentication(
      request,
      body as Parameters<typeof verifyPasskeyAuthentication>[1],
    );
    const session = await createSession(verification.userId, request);
    const response = NextResponse.json({ verified: true });

    setResponseCookie(response.cookies, buildSessionCookie(session.token, session.expiresAt));

    return response;
  } catch (error) {
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    if (error instanceof AuthFlowError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    throw error;
  }
};
