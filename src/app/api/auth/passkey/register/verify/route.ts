/* eslint-disable jsdoc/require-jsdoc */

import { type NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { AuthFlowError } from "@/lib/auth/errors";
import { verifyPasskeyRegistration } from "@/lib/auth/passkey";
import { toAuthErrorResponse } from "@/lib/auth/response";

export const POST = async (request: NextRequest) => {
  let session;
  try {
    session = await requireSession(request);
  } catch (error) {
    const authResponse = toAuthErrorResponse(error);
    if (authResponse) return authResponse;
    throw error;
  }

  const body: unknown = await request.json();

  try {
    const data = await verifyPasskeyRegistration(
      session,
      request,
      body as Parameters<typeof verifyPasskeyRegistration>[2],
    );
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof AuthFlowError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    throw error;
  }
};
