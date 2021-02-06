import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    email
    role
    verified
    address
  }
`;

export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantParts on Restaurant {
    id
    name
    address
    coverImg
    category {
      name
      slug
    }
    isPromoted
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryParts on Category {
    id
    name
    coverImg
    slug
    restaurantCount
  }
`;

export const DISH_FRAGMENT = gql`
  fragment DishParts on Dish {
    id
    name
    photo
    price
    description
    options {
      name
      price
      choices {
        name
        price
      }
    }
  }
`;

export const ORDER_FRAGMENT = gql`
  fragment OrderParts on Order {
    id
    createdAt
    total
  }
`;

export const GET_ORDER_FRAGMENT = gql`
  fragment GetOrderParts on Order {
    id
    createdAt
    total
    status
    customer {
      email
    }
    driver {
      email
    }
    restaurant {
      id
      name
    }
    items {
      dish {
        id
        price
        name
      }
      options {
        name
        choice
        price
      }
      total
    }
  }
`;
