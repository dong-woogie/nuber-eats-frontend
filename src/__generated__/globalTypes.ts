/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum OrderStatus {
  Cooked = "Cooked",
  Cooking = "Cooking",
  Drivered = "Drivered",
  Pending = "Pending",
  PickUp = "PickUp",
}

export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}

export interface CategoryInput {
  page?: number | null;
  slug: string;
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateDishInput {
  name: string;
  price: number;
  description: string;
  photo?: string | null;
  options?: DishOptionInputType[] | null;
  restaurantId: number;
}

export interface CreateOrderInput {
  restaurantId: number;
  items: CreateOrderItemInput[];
}

export interface CreateOrderItemInput {
  dishId: number;
  options?: OrderItemOptionInputType[] | null;
}

export interface CreateRestaurantInput {
  name: string;
  address: string;
  categoryName: string;
  coverImg?: string | null;
}

export interface DishChoiceInputType {
  id?: number | null;
  name: string;
  price?: number | null;
}

export interface DishOptionInputType {
  id?: number | null;
  name: string;
  price?: number | null;
  choices?: DishChoiceInputType[] | null;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
}

export interface GetOrderInput {
  id: number;
}

export interface GetOrdersInput {
  status?: OrderStatus | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface MyRestaurantInput {
  restaurantId: number;
}

export interface OrderItemOptionInputType {
  name: string;
  choice?: string | null;
  price?: number | null;
}

export interface OrderUpdatesInput {
  id: number;
}

export interface RestaurantInput {
  restaurantId: number;
}

export interface RestaurantsInput {
  page?: number | null;
}

export interface SearchRestaurantsInput {
  page?: number | null;
  query: string;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
