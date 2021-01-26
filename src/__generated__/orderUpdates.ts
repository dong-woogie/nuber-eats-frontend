/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderUpdatesInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: orderUpdates
// ====================================================

export interface orderUpdates_orderUpdates_customer {
  __typename: "User";
  email: string;
}

export interface orderUpdates_orderUpdates_driver {
  __typename: "User";
  email: string;
}

export interface orderUpdates_orderUpdates_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
}

export interface orderUpdates_orderUpdates_items_dish {
  __typename: "Dish";
  id: number;
  price: number;
  name: string;
}

export interface orderUpdates_orderUpdates_items_options {
  __typename: "OrderItemOption";
  name: string;
  choice: string | null;
  price: number | null;
}

export interface orderUpdates_orderUpdates_items {
  __typename: "OrderItem";
  dish: orderUpdates_orderUpdates_items_dish | null;
  options: orderUpdates_orderUpdates_items_options[] | null;
  total: number | null;
}

export interface orderUpdates_orderUpdates {
  __typename: "Order";
  id: number;
  createdAt: any;
  total: number | null;
  status: OrderStatus;
  customer: orderUpdates_orderUpdates_customer | null;
  driver: orderUpdates_orderUpdates_driver | null;
  restaurant: orderUpdates_orderUpdates_restaurant;
  items: orderUpdates_orderUpdates_items[] | null;
}

export interface orderUpdates {
  orderUpdates: orderUpdates_orderUpdates;
}

export interface orderUpdatesVariables {
  input: OrderUpdatesInput;
}
