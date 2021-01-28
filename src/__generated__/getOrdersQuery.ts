/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOrdersInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: getOrdersQuery
// ====================================================

export interface getOrdersQuery_getOrders_orders_customer {
  __typename: "User";
  email: string;
}

export interface getOrdersQuery_getOrders_orders_driver {
  __typename: "User";
  email: string;
}

export interface getOrdersQuery_getOrders_orders_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
}

export interface getOrdersQuery_getOrders_orders_items_dish {
  __typename: "Dish";
  id: number;
  price: number;
  name: string;
}

export interface getOrdersQuery_getOrders_orders_items_options {
  __typename: "OrderItemOption";
  name: string;
  choice: string | null;
  price: number | null;
}

export interface getOrdersQuery_getOrders_orders_items {
  __typename: "OrderItem";
  dish: getOrdersQuery_getOrders_orders_items_dish | null;
  options: getOrdersQuery_getOrders_orders_items_options[] | null;
  total: number | null;
}

export interface getOrdersQuery_getOrders_orders {
  __typename: "Order";
  id: number;
  createdAt: any;
  total: number | null;
  status: OrderStatus;
  customer: getOrdersQuery_getOrders_orders_customer | null;
  driver: getOrdersQuery_getOrders_orders_driver | null;
  restaurant: getOrdersQuery_getOrders_orders_restaurant;
  items: getOrdersQuery_getOrders_orders_items[] | null;
}

export interface getOrdersQuery_getOrders {
  __typename: "GetOrdersOutput";
  ok: boolean;
  error: string | null;
  orders: getOrdersQuery_getOrders_orders[] | null;
}

export interface getOrdersQuery {
  getOrders: getOrdersQuery_getOrders;
}

export interface getOrdersQueryVariables {
  input: GetOrdersInput;
}
