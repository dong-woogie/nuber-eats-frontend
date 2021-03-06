/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: GetOrderParts
// ====================================================

export interface GetOrderParts_customer_position {
  __typename: "PositionEntity";
  coordinates: number[];
}

export interface GetOrderParts_customer {
  __typename: "User";
  id: number;
  email: string;
  address: string | null;
  position: GetOrderParts_customer_position;
}

export interface GetOrderParts_driver {
  __typename: "User";
  id: number;
  email: string;
}

export interface GetOrderParts_restaurant_position {
  __typename: "PositionEntity";
  coordinates: number[];
}

export interface GetOrderParts_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  address: string;
  position: GetOrderParts_restaurant_position | null;
}

export interface GetOrderParts_items_dish {
  __typename: "Dish";
  id: number;
  price: number;
  name: string;
}

export interface GetOrderParts_items_options {
  __typename: "OrderItemOption";
  name: string;
  choice: string | null;
  price: number | null;
}

export interface GetOrderParts_items {
  __typename: "OrderItem";
  dish: GetOrderParts_items_dish | null;
  options: GetOrderParts_items_options[] | null;
  total: number | null;
}

export interface GetOrderParts {
  __typename: "Order";
  id: number;
  createdAt: any;
  total: number | null;
  status: OrderStatus;
  distance: number | null;
  customer: GetOrderParts_customer | null;
  driver: GetOrderParts_driver | null;
  restaurant: GetOrderParts_restaurant;
  items: GetOrderParts_items[] | null;
}
