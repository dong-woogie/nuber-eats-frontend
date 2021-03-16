import { useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";
import { RESTAURANTS_PAGE_QUERY } from "../graphql/restaurant/query";
import { useScrollPagination } from "./useScrollPagination";

export const useRestaurantsPage = () => {
  const { data, loading, fetchMore } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_PAGE_QUERY, {
    variables: { input: { take: 3 } },
  });

  const [hasMore, setHasMore] = useState(true);

  const onLoadMore = useCallback(
    (skip: number) => {
      const take = 3;
      return fetchMore({
        variables: { input: { skip, take } },
        updateQuery(prev, { fetchMoreResult }) {
          if (!fetchMoreResult) return prev;
          if (fetchMoreResult.restaurants.restaurants?.length === 0) {
            setHasMore(false);
            return prev;
          }

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

  useScrollPagination({
    onLoadMore,
    skip: data?.restaurants.restaurants?.length || 0,
    hasMore,
  });

  return { data, loading, onLoadMore };
};
