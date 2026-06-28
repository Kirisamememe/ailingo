/* eslint-disable jsdoc/require-jsdoc */

import { type NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { startPasskeyRegistration } from "@/lib/auth/passkey";
import { toAuthErrorResponse } from "@/lib/auth/response";

export const GET = async (request: NextRequest) => {
  let session;
  try {
    session = await requireSession(request);
  } catch (error) {
    const authResponse = toAuthErrorResponse(error);
    if (authResponse) return authResponse;
    throw error;
  }

  const data = await startPasskeyRegistration(session, request);

  return NextResponse.json(data);
};
