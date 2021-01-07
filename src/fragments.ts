import { gql } from "@apollo/client";

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
