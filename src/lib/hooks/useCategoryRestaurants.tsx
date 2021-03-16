import { useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import {
  categoryQuery,
  categoryQueryVariables,
} from "../../__generated__/categoryQuery";
import { CATEGORY_QUERY } from "../graphql/restaurant";
import { useScrollPagination } from "./useScrollPagination";

export const useCategoryRestaurants = (slug: string) => {
  const { data, loading, fetchMore } = useQuery<
    categoryQuery,
    categoryQueryVariables
  >(CATEGORY_QUERY, {
    variables: {
      input: {
        take: 3,
        slug,
      },
    },
  });

  const [hasMore, setHasMore] = useState(true);

  const onLoadMore = useCallback(
    (skip: number) => {
      const take = 3;
      return fetchMore({
        variables: { input: { slug, take, skip } },
        updateQuery(prev, { fetchMoreResult }) {
          if (!fetchMoreResult) return prev;
          if (fetchMoreResult.category.restaurants?.length === 0) {
            setHasMore(false);
            return prev;
          }
          const result = [
            ...(prev.category.restaurants || []),
            ...(fetchMoreResult?.category.restaurants || []),
          ];
          return {
            ...prev,
            category: {
              ...prev.category,
              restaurants: result,
            },
          };
        },
      });
    },
    [fetchMore, slug]
  );

  useScrollPagination({
    onLoadMore,
    hasMore,
    skip: data?.category.restaurants?.length || 0,
  });

  return { data, loading };
};
