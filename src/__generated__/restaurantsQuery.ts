/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaurantsQuery
// ====================================================

export interface restaurantsQuery_restaurants_results_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface restaurantsQuery_restaurants_results {
  __typename: "Restaurant";
  id: number;
  name: string;
  address: string;
  coverImg: string | null;
  category: restaurantsQuery_restaurants_results_category | null;
  isPromoted: boolean;
}

export interface restaurantsQuery_restaurants {
  __typename: "RestaurantsOutput";
  ok: boolean;
  error: string | null;
  results: restaurantsQuery_restaurants_results[] | null;
}

export interface restaurantsQuery {
  restaurants: restaurantsQuery_restaurants;
}

export interface restaurantsQueryVariables {
  input: RestaurantsInput;
}
