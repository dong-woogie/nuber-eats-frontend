/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AnotherDriverTakeOrderInput } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: anotherDriverTakeOrder
// ====================================================

export interface anotherDriverTakeOrder_anotherDriverTakeOrder {
  __typename: "AnotherDriverTakeOrderOutput";
  orderId: number;
}

export interface anotherDriverTakeOrder {
  anotherDriverTakeOrder: anotherDriverTakeOrder_anotherDriverTakeOrder;
}

export interface anotherDriverTakeOrderVariables {
  input: AnotherDriverTakeOrderInput;
}
