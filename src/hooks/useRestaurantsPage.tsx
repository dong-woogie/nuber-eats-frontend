import { gql, useQuery } from "@apollo/client";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../fragments";
import { RestaurantsInput } from "../__generated__/globalTypes";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../__generated__/restaurantsPageQuery";

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategoies {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

export const useRestaurantsQuery = (input: RestaurantsInput) => {
  return useQuery<restaurantsPageQuery, restaurantsPageQueryVariables>(
    RESTAURANTS_QUERY,
    {
      variables: {
        input,
      },
    }
  );
};
