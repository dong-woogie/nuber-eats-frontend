/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: pendingOrder
// ====================================================

export interface pendingOrder_pendingOrder_customer {
  __typename: "User";
  email: string;
}

export interface pendingOrder_pendingOrder_driver {
  __typename: "User";
  email: string;
}

export interface pendingOrder_pendingOrder_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
}

export interface pendingOrder_pendingOrder_items_dish {
  __typename: "Dish";
  id: number;
  price: number;
  name: string;
}

export interface pendingOrder_pendingOrder_items_options {
  __typename: "OrderItemOption";
  name: string;
  choice: string | null;
  price: number | null;
}

export interface pendingOrder_pendingOrder_items {
  __typename: "OrderItem";
  dish: pendingOrder_pendingOrder_items_dish | null;
  options: pendingOrder_pendingOrder_items_options[] | null;
  total: number | null;
}

export interface pendingOrder_pendingOrder {
  __typename: "Order";
  id: number;
  createdAt: any;
  total: number | null;
  status: OrderStatus;
  customer: pendingOrder_pendingOrder_customer | null;
  driver: pendingOrder_pendingOrder_driver | null;
  restaurant: pendingOrder_pendingOrder_restaurant;
  items: pendingOrder_pendingOrder_items[] | null;
}

export interface pendingOrder {
  pendingOrder: pendingOrder_pendingOrder;
}
