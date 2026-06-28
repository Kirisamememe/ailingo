/* eslint-disable jsdoc/require-jsdoc */

import { type NextRequest, NextResponse } from "next/server";
import { ForbiddenError } from "@/lib/auth";
import { startPasskeyAuthentication } from "@/lib/auth/passkey";

export const POST = async (request: NextRequest) => {
  try {
    const data = await startPasskeyAuthentication(request);
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    throw error;
  }
};
