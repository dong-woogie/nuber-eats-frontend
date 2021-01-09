import { useLazyQuery } from "@apollo/client";
import { useCallback } from "react";
import {
  searchRestaurantsQuery,
  searchRestaurantsQueryVariables,
} from "../../__generated__/searchRestaurantsQuery";
import { SEARCH_RESTAURANTS_QUERY } from "../graphql/restaurant";

export const useSearchRestaurants = (query: string) => {
  const [called, { data, loading, fetchMore }] = useLazyQuery<
    searchRestaurantsQuery,
    searchRestaurantsQueryVariables
  >(SEARCH_RESTAURANTS_QUERY, {
    variables: { input: { query } },
  });

  const onLoadMore = useCallback(
    (page: number) => {
      return (
        fetchMore &&
        fetchMore({
          variables: { input: { query, page } },
          updateQuery(prev, { fetchMoreResult }) {
            if (!fetchMoreResult) return prev;
            if (fetchMoreResult.searchRestaurants.restaurants?.length === 0) {
              return prev;
            }
            const result = [
              ...(prev.searchRestaurants.restaurants || []),
              ...(fetchMoreResult.searchRestaurants.restaurants || []),
            ];
            return {
              ...prev,
              searchRestaurants: {
                ...prev.searchRestaurants,
                restaurants: result,
              },
            };
          },
        })
      );
    },
    [fetchMore, query]
  );

  const page = (data?.searchRestaurants.restaurants?.length || 1) / 3 + 1;

  return { called, data, loading, onLoadMore, page };
};
