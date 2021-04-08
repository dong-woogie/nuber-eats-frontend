/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PickupOrderInput } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: pickupOrder
// ====================================================

export interface pickupOrder_pickupOrder {
  __typename: "PickupOrderOutput";
  orderId: number;
}

export interface pickupOrder {
  pickupOrder: pickupOrder_pickupOrder;
}

export interface pickupOrderVariables {
  input: PickupOrderInput;
}
