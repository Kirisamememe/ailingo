/* eslint-disable jsdoc/require-jsdoc */

import { type NextRequest, NextResponse } from "next/server";
import { getGoogleAuthorizationRedirect } from "@/lib/auth/google";

export const GET = async (request: NextRequest) => {
  const authorizationUrl = await getGoogleAuthorizationRedirect(request);
  return NextResponse.redirect(authorizationUrl);
};
