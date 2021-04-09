/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: getDriverOwnOrders
// ====================================================

export interface getDriverOwnOrders_getDriverOwnOrders_orders_customer_position {
  __typename: "PositionEntity";
  coordinates: number[];
}

export interface getDriverOwnOrders_getDriverOwnOrders_orders_customer {
  __typename: "User";
  id: number;
  email: string;
  address: string | null;
  position: getDriverOwnOrders_getDriverOwnOrders_orders_customer_position;
}

export interface getDriverOwnOrders_getDriverOwnOrders_orders_driver {
  __typename: "User";
  id: number;
  email: string;
}

export interface getDriverOwnOrders_getDriverOwnOrders_orders_restaurant_position {
  __typename: "PositionEntity";
  coordinates: number[];
}

export interface getDriverOwnOrders_getDriverOwnOrders_orders_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  address: string;
  position: getDriverOwnOrders_getDriverOwnOrders_orders_restaurant_position | null;
}

export interface getDriverOwnOrders_getDriverOwnOrders_orders_items_dish {
  __typename: "Dish";
  id: number;
  price: number;
  name: string;
}

export interface getDriverOwnOrders_getDriverOwnOrders_orders_items_options {
  __typename: "OrderItemOption";
  name: string;
  choice: string | null;
  price: number | null;
}

export interface getDriverOwnOrders_getDriverOwnOrders_orders_items {
  __typename: "OrderItem";
  dish: getDriverOwnOrders_getDriverOwnOrders_orders_items_dish | null;
  options: getDriverOwnOrders_getDriverOwnOrders_orders_items_options[] | null;
  total: number | null;
}

export interface getDriverOwnOrders_getDriverOwnOrders_orders {
  __typename: "Order";
  id: number;
  createdAt: any;
  total: number | null;
  status: OrderStatus;
  distance: number | null;
  customer: getDriverOwnOrders_getDriverOwnOrders_orders_customer | null;
  driver: getDriverOwnOrders_getDriverOwnOrders_orders_driver | null;
  restaurant: getDriverOwnOrders_getDriverOwnOrders_orders_restaurant;
  items: getDriverOwnOrders_getDriverOwnOrders_orders_items[] | null;
}

export interface getDriverOwnOrders_getDriverOwnOrders {
  __typename: "GetDriverOwnOrdersOutput";
  ok: boolean;
  error: string | null;
  orders: getDriverOwnOrders_getDriverOwnOrders_orders[] | null;
}

export interface getDriverOwnOrders {
  getDriverOwnOrders: getDriverOwnOrders_getDriverOwnOrders;
}
