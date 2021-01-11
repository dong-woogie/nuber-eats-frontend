import React, { useCallback } from "react";
import foodImg from "../../images/food.png";
import marketingImg from "../../images/marketing.png";
import Category from "../../components/Category";
import { useRestaurantsPage } from "../../lib/hooks/useRestaurantsPage";
import RestaurantGrid from "../../components/RestaurantGrid";

function Restaurants() {
  const { data, loading, onLoadMore, page } = useRestaurantsPage();
  const onClickMoreView = useCallback(async () => {
    await onLoadMore(page);
  }, [page, onLoadMore]);

  return (
    <div className="flex-1 flex flex-col">
      <section className="bg-gray-800 w-full flex items-center sm:p-3 md:px-16 md:py-6 sm:max-h-80">
        <div className="hidden sm:w-1/3 text-white sm:flex sm:flex-col sm:justify-center sm:h-full">
          <h1 className="font-medium text-5xl mb-3">Crave it? Get it.</h1>
          <h4 className="font-light text-lg">
            Search for a favorite restaurant, cuisine, or dish.
          </h4>
        </div>
        <div className="sm:w-2/3 w-full box-border flex justify-center lg:gap-10">
          <img src={foodImg} alt="food" className="w-full h-full sm:max-w-md" />
          <img
            src={marketingImg}
            alt="food"
            className="hidden xl:block w-full h-full max-w-md"
          />
        </div>
      </section>
      <section className="base-wrap-w mt-8">
        <div className="flex justify-around max-w-md m-auto">
          {data?.allCategories.categories?.map((category) => (
            <Category
              slug={category.slug}
              name={category.name}
              coverImg={category.coverImg}
              key={category.id}
            />
          ))}
        </div>
        <hr className="mt-8" />
      </section>

      <RestaurantGrid
        restaurants={data?.restaurants.restaurants || []}
        loading={loading}
        onClickMoreView={onClickMoreView}
        isMoreView={page <= (data?.restaurants.totalPages || 0)}
      />
    </div>
  );
}

export default Restaurants;
