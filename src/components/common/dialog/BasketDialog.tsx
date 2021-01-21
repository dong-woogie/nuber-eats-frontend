import { gql, useMutation } from "@apollo/client";
import React from "react";
import {
  createOrderMutation,
  createOrderMutationVariables,
} from "../../../__generated__/createOrderMutation";
import DialogWrap from "./DialogWrap";

export const CREATE_ORDER_MUTATION = gql`
  mutation createOrderMutation($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
    }
  }
`;

function BasketDialog() {
  const [createOrder, { data }] = useMutation<
    createOrderMutation,
    createOrderMutationVariables
  >(CREATE_ORDER_MUTATION);
  return (
    <DialogWrap title={"장바구니"} onClose={() => {}}>
      <div></div>
    </DialogWrap>
  );
}

export default BasketDialog;
