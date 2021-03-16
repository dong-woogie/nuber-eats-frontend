import React from "react";
import { useParams } from "react-router-dom";
import LoadError from "../../components/common/LoadError";
import RestaurantGrid from "../../components/restaurant/RestaurantGrid";
import { useCategoryRestaurants } from "../../lib/hooks/useCategoryRestaurants";

interface ICategoryParams {
  slug: string;
}

function CategoryPage() {
  const params = useParams<ICategoryParams>();

  const { data, loading } = useCategoryRestaurants(params.slug);

  if (!data?.category.ok) return <LoadError error={data?.category.error} />;
  return (
    <div className="flex-1">
      <RestaurantGrid
        restaurants={data?.category.restaurants || []}
        loading={loading}
      />
    </div>
  );
}

export default CategoryPage;
