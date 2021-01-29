import { gql } from "@apollo/client";
import { DISH_FRAGMENT } from "../../../fragments";

export const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurantMutation($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
      restaurantId
    }
  }
`;

export const CREATE_DISH_MUTATION = gql`
  mutation createDishMutation($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
      dish {
        ...DishParts
      }
    }
  }
  ${DISH_FRAGMENT}
`;
