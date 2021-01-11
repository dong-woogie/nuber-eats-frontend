import React from "react";
import { useParams } from "react-router-dom";
import LoadError from "../../components/LoadError";
import RestaurantGrid from "../../components/RestaurantGrid";
import { useCategoryRestaurants } from "../../lib/hooks/useCategoryRestaurants";

interface ICategoryParams {
  slug: string;
}

function Category() {
  const params = useParams<ICategoryParams>();

  const { data, loading, onLoadMore, page } = useCategoryRestaurants(
    params.slug
  );

  const onClickMoreView = async () => {
    await onLoadMore(page);
  };

  if (!data?.category.ok) return <LoadError error={data?.category.error} />;
  return (
    <div className="flex-1">
      <RestaurantGrid
        restaurants={data?.category.restaurants || []}
        loading={loading}
        onClickMoreView={onClickMoreView}
        isMoreView={page <= (data.category.totalPages || 0)}
      />
    </div>
  );
}

export default Category;
