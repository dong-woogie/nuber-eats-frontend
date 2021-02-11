/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CookedOrderInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: cookedOrder
// ====================================================

export interface cookedOrder_cookedOrder_customer {
  __typename: "User";
  email: string;
}

export interface cookedOrder_cookedOrder_driver {
  __typename: "User";
  email: string;
}

export interface cookedOrder_cookedOrder_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
}

export interface cookedOrder_cookedOrder_items_dish {
  __typename: "Dish";
  id: number;
  price: number;
  name: string;
}

export interface cookedOrder_cookedOrder_items_options {
  __typename: "OrderItemOption";
  name: string;
  choice: string | null;
  price: number | null;
}

export interface cookedOrder_cookedOrder_items {
  __typename: "OrderItem";
  dish: cookedOrder_cookedOrder_items_dish | null;
  options: cookedOrder_cookedOrder_items_options[] | null;
  total: number | null;
}

export interface cookedOrder_cookedOrder {
  __typename: "Order";
  id: number;
  createdAt: any;
  total: number | null;
  status: OrderStatus;
  customer: cookedOrder_cookedOrder_customer | null;
  driver: cookedOrder_cookedOrder_driver | null;
  restaurant: cookedOrder_cookedOrder_restaurant;
  items: cookedOrder_cookedOrder_items[] | null;
}

export interface cookedOrder {
  cookedOrder: cookedOrder_cookedOrder;
}

export interface cookedOrderVariables {
  input: CookedOrderInput;
}
