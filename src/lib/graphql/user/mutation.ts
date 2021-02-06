import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "../../../fragments";

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation loginMitation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;

export const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

export const CREATE_ADDRESS_MUTATION = gql`
  mutation createAddress($input: CreateAddressInput!) {
    createAddress(input: $input) {
      ok
      error
      user {
        ...UserParts
      }
    }
  }
  ${USER_FRAGMENT}
`;
