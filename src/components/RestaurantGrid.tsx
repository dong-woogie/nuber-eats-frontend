import React from "react";
import { RestaurantParts } from "../__generated__/RestaurantParts";
import Loading from "./Loading";
import Restaurant from "./Restaurant";

interface IRestaurantGridProps {
  restaurants: RestaurantParts[];
  loading: boolean;
}

function RestaurantGrid({ restaurants, loading }: IRestaurantGridProps) {
  return (
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
      {loading && <Loading loading={loading} />}
    </section>
  );
}

export default RestaurantGrid;
