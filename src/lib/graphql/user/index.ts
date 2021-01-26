import { gql } from "@apollo/client";
import { GET_ORDER_FRAGMENT } from "../../../fragments";

export const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const GET_ORDER_QUERY = gql`
  query getOrderQuery($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
        ...GetOrderParts
      }
    }
  }
  ${GET_ORDER_FRAGMENT}
`;
