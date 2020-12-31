/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: LoginMitation
// ====================================================

export interface LoginMitation_login {
  __typename: "LoginOutput";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface LoginMitation {
  login: LoginMitation_login;
}

export interface LoginMitationVariables {
  loginInput: LoginInput;
}
