import { gql } from "@apollo/client";
import { GET_ORDER_FRAGMENT } from "../../../fragments";

export const ORDER_SUBSCRIPTION = gql`
  subscription orderUpdate($input: OrderUpdatesInput!) {
    orderUpdate(input: $input) {
      ...GetOrderParts
    }
  }
  ${GET_ORDER_FRAGMENT}
`;

export const PENDING_ORDER_SUBSCRIPTION = gql`
  subscription pendingOrder {
    pendingOrder {
      ...GetOrderParts
    }
  }
  ${GET_ORDER_FRAGMENT}
`;
