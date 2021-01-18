import React from "react";
import { DishParts } from "../__generated__/DishParts";
import Dish from "./Dish";

function DishGrid({ dishes }: { dishes: DishParts[] }) {
  return (
    <section className="restaurants-wrap">
      {dishes.map((dish) => (
        <Dish
          name={dish.name}
          price={dish.price}
          photo={dish.photo}
          description={dish.description}
          key={dish.id}
        />
      ))}
    </section>
  );
}

export default DishGrid;
