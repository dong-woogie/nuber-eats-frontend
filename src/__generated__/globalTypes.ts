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

export interface AnotherDriverTakeOrderInput {
  lat: number;
  lng: number;
}

export interface CategoryInput {
  take: number;
  skip?: number | null;
  slug: string;
}

export interface CookedOrderInput {
  lat: number;
  lng: number;
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateAddressInput {
  address: string;
  detailAddress: string;
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
  detailAddress?: string | null;
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

export interface EditOrderInput {
  id: number;
  status: OrderStatus;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
}

export interface GetDriverOrderInput {
  id: number;
  lat: number;
  lng: number;
}

export interface GetDriverOrdersInput {
  status?: OrderStatus | null;
  lat: number;
  lng: number;
}

export interface GetOrderInput {
  id: number;
}

export interface GetOrdersInput {
  status?: OrderStatus | null;
}

export interface GetOwnerOrdersInput {
  restaurantId: number;
  statuses?: OrderStatus[] | null;
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

export interface PickupOrderInput {
  restaurantId: number;
}

export interface RestaurantInput {
  restaurantId: number;
}

export interface RestaurantsInput {
  take: number;
  skip?: number | null;
}

export interface SearchRestaurantsInput {
  take: number;
  skip?: number | null;
  query: string;
}

export interface TakeOrderInput {
  id: number;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
