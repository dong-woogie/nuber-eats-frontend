import { useQuery } from "@apollo/client";
import { useCallback } from "react";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";
import { RESTAURANTS_PAGE_QUERY } from "../graphql/restaurant/query";

export const useRestaurantsPage = () => {
  const { data, loading, fetchMore } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_PAGE_QUERY, { variables: { input: {} } });

  const onLoadMore = useCallback(
    (page: number) => {
      return fetchMore({
        variables: { input: { page } },
        updateQuery(prev, { fetchMoreResult }) {
          if (!fetchMoreResult) return prev;
          if (fetchMoreResult.restaurants.restaurants?.length === 0)
            return prev;

          const result = [
            ...(prev.restaurants.restaurants || []),
            ...(fetchMoreResult.restaurants.restaurants || []),
          ];
          return {
            ...prev,
            restaurants: {
              ...prev.restaurants,
              restaurants: result,
            },
          };
        },
      });
    },
    [fetchMore]
  );
  const page = Math.ceil((data?.restaurants.restaurants?.length || 1) / 3 + 1);

  return { data, loading, onLoadMore, page };
};
