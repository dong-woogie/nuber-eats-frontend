import { gql } from "@apollo/client";

export const CREATE_ORDER_MUTATION = gql`
  mutation createOrderMutation($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
      orderId
    }
  }
`;

export const EDIT_ORDER_MUTATION = gql`
  mutation editOrderMutation($input: EditOrderInput!) {
    editOrder(input: $input) {
      ok
      error
    }
  }
`;
