import { useQuery } from "@apollo/client";
import { MeQuery } from "../../__generated__/MeQuery";
import { ME_QUERY } from "../graphql/user";

export const useMe = () => {
  return useQuery<MeQuery>(ME_QUERY);
};
