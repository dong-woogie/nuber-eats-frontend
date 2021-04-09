/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TakeOrderInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: takeOrderMutation
// ====================================================

export interface takeOrderMutation_takeOrder_order_customer_position {
  __typename: "PositionEntity";
  coordinates: number[];
}

export interface takeOrderMutation_takeOrder_order_customer {
  __typename: "User";
  id: number;
  email: string;
  address: string | null;
  position: takeOrderMutation_takeOrder_order_customer_position;
}

export interface takeOrderMutation_takeOrder_order_driver {
  __typename: "User";
  id: number;
  email: string;
}

export interface takeOrderMutation_takeOrder_order_restaurant_position {
  __typename: "PositionEntity";
  coordinates: number[];
}

export interface takeOrderMutation_takeOrder_order_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  address: string;
  position: takeOrderMutation_takeOrder_order_restaurant_position | null;
}

export interface takeOrderMutation_takeOrder_order_items_dish {
  __typename: "Dish";
  id: number;
  price: number;
  name: string;
}

export interface takeOrderMutation_takeOrder_order_items_options {
  __typename: "OrderItemOption";
  name: string;
  choice: string | null;
  price: number | null;
}

export interface takeOrderMutation_takeOrder_order_items {
  __typename: "OrderItem";
  dish: takeOrderMutation_takeOrder_order_items_dish | null;
  options: takeOrderMutation_takeOrder_order_items_options[] | null;
  total: number | null;
}

export interface takeOrderMutation_takeOrder_order {
  __typename: "Order";
  id: number;
  createdAt: any;
  total: number | null;
  status: OrderStatus;
  distance: number | null;
  customer: takeOrderMutation_takeOrder_order_customer | null;
  driver: takeOrderMutation_takeOrder_order_driver | null;
  restaurant: takeOrderMutation_takeOrder_order_restaurant;
  items: takeOrderMutation_takeOrder_order_items[] | null;
}

export interface takeOrderMutation_takeOrder {
  __typename: "TakeOrderOutput";
  ok: boolean;
  error: string | null;
  order: takeOrderMutation_takeOrder_order;
}

export interface takeOrderMutation {
  takeOrder: takeOrderMutation_takeOrder;
}

export interface takeOrderMutationVariables {
  input: TakeOrderInput;
}
