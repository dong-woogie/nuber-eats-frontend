/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOrderInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: getOrderQuery
// ====================================================

export interface getOrderQuery_getOrder_order_customer {
  __typename: "User";
  email: string;
}

export interface getOrderQuery_getOrder_order_driver {
  __typename: "User";
  email: string;
}

export interface getOrderQuery_getOrder_order_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
}

export interface getOrderQuery_getOrder_order_items_dish {
  __typename: "Dish";
  id: number;
  price: number;
  name: string;
}

export interface getOrderQuery_getOrder_order_items_options {
  __typename: "OrderItemOption";
  name: string;
  choice: string | null;
  price: number | null;
}

export interface getOrderQuery_getOrder_order_items {
  __typename: "OrderItem";
  dish: getOrderQuery_getOrder_order_items_dish | null;
  options: getOrderQuery_getOrder_order_items_options[] | null;
}

export interface getOrderQuery_getOrder_order {
  __typename: "Order";
  id: number;
  createdAt: any;
  total: number | null;
  status: OrderStatus;
  customer: getOrderQuery_getOrder_order_customer | null;
  driver: getOrderQuery_getOrder_order_driver | null;
  restaurant: getOrderQuery_getOrder_order_restaurant;
  items: getOrderQuery_getOrder_order_items[] | null;
}

export interface getOrderQuery_getOrder {
  __typename: "GetOrderOutput";
  ok: boolean;
  error: string | null;
  order: getOrderQuery_getOrder_order | null;
}

export interface getOrderQuery {
  getOrder: getOrderQuery_getOrder;
}

export interface getOrderQueryVariables {
  input: GetOrderInput;
}
