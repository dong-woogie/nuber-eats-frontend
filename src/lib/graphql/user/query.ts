import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "../../../fragments";

export const ME_QUERY = gql`
  query MeQuery {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;
