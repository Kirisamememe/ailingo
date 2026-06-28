/* eslint-disable jsdoc/require-jsdoc */

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export class AuthFlowError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthFlowError";
  }
}
