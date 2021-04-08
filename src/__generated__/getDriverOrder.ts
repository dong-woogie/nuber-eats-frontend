/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetDriverOrderInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: getDriverOrder
// ====================================================

export interface getDriverOrder_getDriverOrder_order_customer_position {
  __typename: "PositionEntity";
  coordinates: number[];
}

export interface getDriverOrder_getDriverOrder_order_customer {
  __typename: "User";
  id: number;
  email: string;
  address: string | null;
  position: getDriverOrder_getDriverOrder_order_customer_position;
}

export interface getDriverOrder_getDriverOrder_order_driver {
  __typename: "User";
  id: number;
  email: string;
}

export interface getDriverOrder_getDriverOrder_order_restaurant_position {
  __typename: "PositionEntity";
  coordinates: number[];
}

export interface getDriverOrder_getDriverOrder_order_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  address: string;
  position: getDriverOrder_getDriverOrder_order_restaurant_position | null;
}

export interface getDriverOrder_getDriverOrder_order_items_dish {
  __typename: "Dish";
  id: number;
  price: number;
  name: string;
}

export interface getDriverOrder_getDriverOrder_order_items_options {
  __typename: "OrderItemOption";
  name: string;
  choice: string | null;
  price: number | null;
}

export interface getDriverOrder_getDriverOrder_order_items {
  __typename: "OrderItem";
  dish: getDriverOrder_getDriverOrder_order_items_dish | null;
  options: getDriverOrder_getDriverOrder_order_items_options[] | null;
  total: number | null;
}

export interface getDriverOrder_getDriverOrder_order {
  __typename: "Order";
  id: number;
  createdAt: any;
  total: number | null;
  status: OrderStatus;
  distance: number | null;
  customer: getDriverOrder_getDriverOrder_order_customer | null;
  driver: getDriverOrder_getDriverOrder_order_driver | null;
  restaurant: getDriverOrder_getDriverOrder_order_restaurant;
  items: getDriverOrder_getDriverOrder_order_items[] | null;
}

export interface getDriverOrder_getDriverOrder {
  __typename: "GetDriverOrderOutput";
  ok: boolean;
  error: string | null;
  order: getDriverOrder_getDriverOrder_order;
}

export interface getDriverOrder {
  getDriverOrder: getDriverOrder_getDriverOrder;
}

export interface getDriverOrderVariables {
  input: GetDriverOrderInput;
}
