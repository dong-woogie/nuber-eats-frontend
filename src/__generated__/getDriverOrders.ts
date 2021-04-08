/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetDriverOrdersInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: getDriverOrders
// ====================================================

export interface getDriverOrders_getDriverOrders_orders_customer_position {
  __typename: "PositionEntity";
  coordinates: number[];
}

export interface getDriverOrders_getDriverOrders_orders_customer {
  __typename: "User";
  id: number;
  email: string;
  address: string | null;
  position: getDriverOrders_getDriverOrders_orders_customer_position;
}

export interface getDriverOrders_getDriverOrders_orders_driver {
  __typename: "User";
  id: number;
  email: string;
}

export interface getDriverOrders_getDriverOrders_orders_restaurant_position {
  __typename: "PositionEntity";
  coordinates: number[];
}

export interface getDriverOrders_getDriverOrders_orders_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  address: string;
  position: getDriverOrders_getDriverOrders_orders_restaurant_position | null;
}

export interface getDriverOrders_getDriverOrders_orders_items_dish {
  __typename: "Dish";
  id: number;
  price: number;
  name: string;
}

export interface getDriverOrders_getDriverOrders_orders_items_options {
  __typename: "OrderItemOption";
  name: string;
  choice: string | null;
  price: number | null;
}

export interface getDriverOrders_getDriverOrders_orders_items {
  __typename: "OrderItem";
  dish: getDriverOrders_getDriverOrders_orders_items_dish | null;
  options: getDriverOrders_getDriverOrders_orders_items_options[] | null;
  total: number | null;
}

export interface getDriverOrders_getDriverOrders_orders {
  __typename: "Order";
  id: number;
  createdAt: any;
  total: number | null;
  status: OrderStatus;
  distance: number | null;
  customer: getDriverOrders_getDriverOrders_orders_customer | null;
  driver: getDriverOrders_getDriverOrders_orders_driver | null;
  restaurant: getDriverOrders_getDriverOrders_orders_restaurant;
  items: getDriverOrders_getDriverOrders_orders_items[] | null;
}

export interface getDriverOrders_getDriverOrders {
  __typename: "GetDriverOrdersOutput";
  ok: boolean;
  error: string | null;
  orders: getDriverOrders_getDriverOrders_orders[] | null;
}

export interface getDriverOrders {
  getDriverOrders: getDriverOrders_getDriverOrders;
}

export interface getDriverOrdersVariables {
  input: GetDriverOrdersInput;
}
