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

export const COOKED_ORDER_SUBSCRIPTION = gql`
  subscription cookedOrder($input: CookedOrderInput!) {
    cookedOrder(input: $input) {
      ...GetOrderParts
    }
  }
  ${GET_ORDER_FRAGMENT}
`;

export const ANOTHER_DRIVER_TAKE_ORDER = gql`
  subscription anotherDriverTakeOrder($input: AnotherDriverTakeOrderInput!) {
    anotherDriverTakeOrder(input: $input) {
      orderId
    }
  }
`;

export const PICKUP_ORDER_SUBSCRIPTION = gql`
  subscription pickupOrder($input: PickupOrderInput!) {
    pickupOrder(input: $input) {
      orderId
    }
  }
`;
