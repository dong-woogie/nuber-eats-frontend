import { useQuery } from "@apollo/client";
import { useCallback } from "react";
import {
  categoryQuery,
  categoryQueryVariables,
} from "../../__generated__/categoryQuery";
import { CATEGORY_QUERY } from "../graphql/restaurant";

export const useCategoryRestaurants = (slug: string) => {
  const { data, loading, fetchMore } = useQuery<
    categoryQuery,
    categoryQueryVariables
  >(CATEGORY_QUERY, {
    variables: {
      input: {
        page: 1,
        slug,
      },
    },
  });

  const onLoadMore = useCallback(
    (page: number) => {
      return fetchMore({
        variables: { input: { slug, page } },
        updateQuery(prev, { fetchMoreResult }) {
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

  const page = Math.ceil((data?.category.restaurants?.length || 1) / 3 + 1);

  return { data, onLoadMore, page, loading };
};
