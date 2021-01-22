import React from "react";
import { RestaurantParts } from "../../__generated__/RestaurantParts";
import MoreViewBtn from "../common/MoreViewBtn";
import Restaurant from "./Restaurant";
import SkeletonRestaurant from "./SkeletonRestaurant";

interface IRestaurantGridProps {
  restaurants: RestaurantParts[];
  loading: boolean;
  isMoreView?: boolean;
  onClickMoreView?: () => Promise<void>;
}

RestaurantGrid.defaultProps = {
  loading: false,
  isMoreView: false,
};

function RestaurantGrid({
  restaurants,
  loading,
  onClickMoreView,
  isMoreView,
}: IRestaurantGridProps) {
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
      {!loading && isMoreView && (
        <MoreViewBtn onClick={onClickMoreView || async function () {}} />
      )}
    </div>
  );
}

export default RestaurantGrid;
