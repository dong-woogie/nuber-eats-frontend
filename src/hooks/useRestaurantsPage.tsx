import { gql, useQuery } from "@apollo/client";
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
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
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
    }
  }
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
