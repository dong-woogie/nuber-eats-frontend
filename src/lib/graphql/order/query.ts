import { gql } from "@apollo/client";
import { GET_ORDER_FRAGMENT } from "../../../fragments";

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

export const GET_ORDERS_QUERY = gql`
  query getOrdersQuery($input: GetOrdersInput!) {
    getOrders(input: $input) {
      ok
      error
      orders {
        ...GetOrderParts
      }
    }
  }
  ${GET_ORDER_FRAGMENT}
`;

export const GET_DRIVER_ORDERS = gql`
  query getDriverOrders($input: GetDriverOrdersInput!) {
    getDriverOrders(input: $input) {
      ok
      error
      orders {
        ...GetOrderParts
      }
    }
  }
  ${GET_ORDER_FRAGMENT}
`;

export const GET_OWNER_ORDERS = gql`
  query getOwnerOrders($input: GetOwnerOrdersInput!) {
    getOwnerOrders(input: $input) {
      ok
      error
      orders {
        ...GetOrderParts
      }
    }
  }
  ${GET_ORDER_FRAGMENT}
`;

export const GET_DRIVER_ORDER = gql`
  query getDriverOrder($input: GetDriverOrderInput!) {
    getDriverOrder(input: $input) {
      ok
      error
      order {
        ...GetOrderParts
      }
    }
  }
  ${GET_ORDER_FRAGMENT}
`;

export const GET_DRIVER_OWN_ORDERS = gql`
  query getDriverOwnOrders {
    getDriverOwnOrders {
      ok
      error
      orders {
        ...GetOrderParts
      }
    }
  }
  ${GET_ORDER_FRAGMENT}
`;
