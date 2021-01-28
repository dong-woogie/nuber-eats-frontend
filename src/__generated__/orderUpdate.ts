/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderUpdatesInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: orderUpdate
// ====================================================

export interface orderUpdate_orderUpdate_customer {
  __typename: "User";
  email: string;
}

export interface orderUpdate_orderUpdate_driver {
  __typename: "User";
  email: string;
}

export interface orderUpdate_orderUpdate_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
}

export interface orderUpdate_orderUpdate_items_dish {
  __typename: "Dish";
  id: number;
  price: number;
  name: string;
}

export interface orderUpdate_orderUpdate_items_options {
  __typename: "OrderItemOption";
  name: string;
  choice: string | null;
  price: number | null;
}

export interface orderUpdate_orderUpdate_items {
  __typename: "OrderItem";
  dish: orderUpdate_orderUpdate_items_dish | null;
  options: orderUpdate_orderUpdate_items_options[] | null;
  total: number | null;
}

export interface orderUpdate_orderUpdate {
  __typename: "Order";
  id: number;
  createdAt: any;
  total: number | null;
  status: OrderStatus;
  customer: orderUpdate_orderUpdate_customer | null;
  driver: orderUpdate_orderUpdate_driver | null;
  restaurant: orderUpdate_orderUpdate_restaurant;
  items: orderUpdate_orderUpdate_items[] | null;
}

export interface orderUpdate {
  orderUpdate: orderUpdate_orderUpdate;
}

export interface orderUpdateVariables {
  input: OrderUpdatesInput;
}
