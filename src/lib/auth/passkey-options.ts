/* eslint-disable jsdoc/require-jsdoc */

import {
  type AuthenticatorTransportFuture,
  generateAuthenticationOptions,
} from "@simplewebauthn/server";

type PasskeyCredentialFilter = {
  id: string;
  transports?: AuthenticatorTransportFuture[];
};

type BuildPasskeyAuthenticationOptionsInput = {
  rpID: string;
  credentials?: PasskeyCredentialFilter[];
};

export const buildPasskeyAuthenticationOptions = async ({
  rpID,
  credentials,
}: BuildPasskeyAuthenticationOptionsInput) => {
  const allowCredentials = credentials?.length
    ? credentials.map((credential) => ({
        id: credential.id,
        transports: credential.transports,
      }))
    : undefined;

  return generateAuthenticationOptions({
    rpID,
    allowCredentials,
    userVerification: "preferred",
  });
};
