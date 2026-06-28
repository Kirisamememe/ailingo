/* eslint-disable jsdoc/require-jsdoc */

import { ForbiddenError, UnauthorizedError } from "./errors";

export const toAuthErrorResponse = (error: unknown) => {
  if (error instanceof UnauthorizedError) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (error instanceof ForbiddenError) {
    return new Response("Forbidden", { status: 403 });
  }

  return null;
};
