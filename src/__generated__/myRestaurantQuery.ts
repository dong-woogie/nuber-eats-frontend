/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myRestaurantQuery
// ====================================================

export interface myRestaurantQuery_myRestaurant_restaurant_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface myRestaurantQuery_myRestaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  address: string;
  coverImg: string | null;
  category: myRestaurantQuery_myRestaurant_restaurant_category | null;
  isPromoted: boolean;
}

export interface myRestaurantQuery_myRestaurant {
  __typename: "MyRestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurant: myRestaurantQuery_myRestaurant_restaurant | null;
}

export interface myRestaurantQuery {
  myRestaurant: myRestaurantQuery_myRestaurant;
}

export interface myRestaurantQueryVariables {
  input: MyRestaurantInput;
}
