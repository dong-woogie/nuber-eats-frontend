import { useLazyQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import {
  searchRestaurantsQuery,
  searchRestaurantsQueryVariables,
} from "../../__generated__/searchRestaurantsQuery";
import { SEARCH_RESTAURANTS_QUERY } from "../graphql/restaurant";
import { useScrollPagination } from "./useScrollPagination";

export const useSearchRestaurants = (query: string) => {
  const [called, { data, loading, fetchMore }] = useLazyQuery<
    searchRestaurantsQuery,
    searchRestaurantsQueryVariables
  >(SEARCH_RESTAURANTS_QUERY, {
    variables: { input: { query, take: 3 } },
  });
  const [hasMore, setHasMore] = useState(true);

  const onLoadMore = useCallback(
    (skip: number) => {
      const take = 3;
      return (
        fetchMore &&
        fetchMore({
          variables: { input: { query, take, skip } },
          updateQuery(prev, { fetchMoreResult }) {
            if (!fetchMoreResult) return prev;
            if (fetchMoreResult.searchRestaurants.restaurants?.length === 0) {
              setHasMore(false);
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

  useScrollPagination({
    onLoadMore,
    skip: data?.searchRestaurants.restaurants?.length || 0,
    hasMore,
  });

  return { called, data, loading, onLoadMore };
};
