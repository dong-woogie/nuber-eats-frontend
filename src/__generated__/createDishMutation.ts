/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateDishInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createDishMutation
// ====================================================

export interface createDishMutation_createDish_dish_options_choices {
  __typename: "DishChoice";
  name: string;
  price: number | null;
}

export interface createDishMutation_createDish_dish_options {
  __typename: "DishOption";
  name: string;
  price: number | null;
  choices: createDishMutation_createDish_dish_options_choices[] | null;
}

export interface createDishMutation_createDish_dish {
  __typename: "Dish";
  id: number;
  name: string;
  photo: string | null;
  price: number;
  description: string;
  options: createDishMutation_createDish_dish_options[] | null;
}

export interface createDishMutation_createDish {
  __typename: "CreateDishOutput";
  ok: boolean;
  error: string | null;
  dish: createDishMutation_createDish_dish | null;
}

export interface createDishMutation {
  createDish: createDishMutation_createDish;
}

export interface createDishMutationVariables {
  input: CreateDishInput;
}
