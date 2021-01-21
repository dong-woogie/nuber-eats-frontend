import React, { useCallback } from "react";
import { selectDishFormVars } from "../apollo";
import { DishParts } from "../__generated__/DishParts";
import Dish from "./Dish";
import { ISelectDish } from "../apollo";

interface IDishGrid {
  dishes: DishParts[];
  restaurantId: number;
}

function DishGrid({ dishes, restaurantId }: IDishGrid) {
  const onClickDishWrap = useCallback(
    (dish: ISelectDish) => () => {
      selectDishFormVars(dish);
    },
    []
  );
  return (
    <section className="restaurants-wrap">
      {dishes.map((dish) => (
        <div
          key={dish.id}
          onClick={onClickDishWrap({ ...dish, restaurantId })}
          className="cursor-pointer hover:bg-green-100 hover:opacity-60 transition-all"
        >
          <Dish
            name={dish.name}
            price={dish.price}
            photo={dish.photo}
            description={dish.description}
          />
        </div>
      ))}
    </section>
  );
}

export default DishGrid;
