import { gql, useQuery } from "@apollo/client";
import { MeQuery } from "../__generated__/MeQuery";

const ME_QUERY = gql`
  query MeQuery {
    me {
      email
      role
    }
  }
`;

export const useMe = () => {
  return useQuery<MeQuery>(ME_QUERY);
};
