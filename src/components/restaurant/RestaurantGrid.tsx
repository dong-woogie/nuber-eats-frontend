import React from "react";
import { RestaurantParts } from "../../__generated__/RestaurantParts";
import Restaurant from "./Restaurant";
import SkeletonRestaurant from "./SkeletonRestaurant";

interface IRestaurantGridProps {
  restaurants: RestaurantParts[];
  loading: boolean;
}

RestaurantGrid.defaultProps = {
  loading: false,
};

function RestaurantGrid({ restaurants, loading }: IRestaurantGridProps) {
  return (
    <div>
      <section className="restaurants-wrap">
        {restaurants.map((restaurant) => (
          <Restaurant
            id={restaurant.id + ""}
            coverImg={restaurant.coverImg}
            name={restaurant.name}
            categoryName={restaurant.category?.name}
            key={restaurant.id}
          />
        ))}
        {loading &&
          Array.from({ length: 3 }).map((empty, index) => (
            <SkeletonRestaurant key={index} />
          ))}
      </section>
    </div>
  );
}

export default RestaurantGrid;
