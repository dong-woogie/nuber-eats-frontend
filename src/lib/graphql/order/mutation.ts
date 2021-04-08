import { gql } from "@apollo/client";
import { GET_ORDER_FRAGMENT } from "../../../fragments";

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

export const TAKE_ORDER_MUTATION = gql`
  mutation takeOrderMutation($input: TakeOrderInput!) {
    takeOrder(input: $input) {
      ok
      error
      order {
        ...GetOrderParts
      }
    }
  }
  ${GET_ORDER_FRAGMENT}
`;
