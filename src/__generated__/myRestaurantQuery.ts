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

export interface myRestaurantQuery_myRestaurant_restaurant_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  price: number | null;
}

export interface myRestaurantQuery_myRestaurant_restaurant_menu_options {
  __typename: "DishOption";
  name: string;
  price: number | null;
  choices: myRestaurantQuery_myRestaurant_restaurant_menu_options_choices[] | null;
}

export interface myRestaurantQuery_myRestaurant_restaurant_menu {
  __typename: "Dish";
  id: number;
  name: string;
  photo: string | null;
  price: number;
  description: string;
  options: myRestaurantQuery_myRestaurant_restaurant_menu_options[] | null;
}

export interface myRestaurantQuery_myRestaurant_restaurant_orders {
  __typename: "Order";
  id: number;
  createdAt: any;
  total: number | null;
}

export interface myRestaurantQuery_myRestaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  address: string;
  coverImg: string | null;
  category: myRestaurantQuery_myRestaurant_restaurant_category | null;
  isPromoted: boolean;
  menu: myRestaurantQuery_myRestaurant_restaurant_menu[];
  orders: myRestaurantQuery_myRestaurant_restaurant_orders[];
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
