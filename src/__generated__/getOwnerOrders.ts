/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOwnerOrdersInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: getOwnerOrders
// ====================================================

export interface getOwnerOrders_getOwnerOrders_orders_customer_position {
  __typename: "PositionEntity";
  coordinates: number[];
}

export interface getOwnerOrders_getOwnerOrders_orders_customer {
  __typename: "User";
  id: number;
  email: string;
  address: string | null;
  position: getOwnerOrders_getOwnerOrders_orders_customer_position;
}

export interface getOwnerOrders_getOwnerOrders_orders_driver {
  __typename: "User";
  id: number;
  email: string;
}

export interface getOwnerOrders_getOwnerOrders_orders_restaurant_position {
  __typename: "PositionEntity";
  coordinates: number[];
}

export interface getOwnerOrders_getOwnerOrders_orders_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  address: string;
  position: getOwnerOrders_getOwnerOrders_orders_restaurant_position | null;
}

export interface getOwnerOrders_getOwnerOrders_orders_items_dish {
  __typename: "Dish";
  id: number;
  price: number;
  name: string;
}

export interface getOwnerOrders_getOwnerOrders_orders_items_options {
  __typename: "OrderItemOption";
  name: string;
  choice: string | null;
  price: number | null;
}

export interface getOwnerOrders_getOwnerOrders_orders_items {
  __typename: "OrderItem";
  dish: getOwnerOrders_getOwnerOrders_orders_items_dish | null;
  options: getOwnerOrders_getOwnerOrders_orders_items_options[] | null;
  total: number | null;
}

export interface getOwnerOrders_getOwnerOrders_orders {
  __typename: "Order";
  id: number;
  createdAt: any;
  total: number | null;
  status: OrderStatus;
  distance: number | null;
  customer: getOwnerOrders_getOwnerOrders_orders_customer | null;
  driver: getOwnerOrders_getOwnerOrders_orders_driver | null;
  restaurant: getOwnerOrders_getOwnerOrders_orders_restaurant;
  items: getOwnerOrders_getOwnerOrders_orders_items[] | null;
}

export interface getOwnerOrders_getOwnerOrders {
  __typename: "GetOwnerOrdersOutput";
  ok: boolean;
  error: string | null;
  orders: getOwnerOrders_getOwnerOrders_orders[] | null;
}

export interface getOwnerOrders {
  getOwnerOrders: getOwnerOrders_getOwnerOrders;
}

export interface getOwnerOrdersVariables {
  input: GetOwnerOrdersInput;
}
