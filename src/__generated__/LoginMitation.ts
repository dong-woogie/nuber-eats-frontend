/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: loginMitation
// ====================================================

export interface loginMitation_login {
  __typename: "LoginOutput";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface loginMitation {
  login: loginMitation_login;
}

export interface loginMitationVariables {
  loginInput: LoginInput;
}
