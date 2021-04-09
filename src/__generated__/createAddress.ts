/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateAddressInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createAddress
// ====================================================

export interface createAddress_createAddress_user {
  __typename: "User";
  id: number;
  email: string;
  role: UserRole;
  verified: boolean;
  address: string | null;
}

export interface createAddress_createAddress {
  __typename: "CreateAddressOutput";
  ok: boolean;
  error: string | null;
  user: createAddress_createAddress_user | null;
}

export interface createAddress {
  createAddress: createAddress_createAddress;
}

export interface createAddressVariables {
  input: CreateAddressInput;
}
