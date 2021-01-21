import React from "react";
import { DishParts } from "../__generated__/DishParts";

type IDishProps = Pick<DishParts, "name" | "description" | "price"> &
  Partial<Pick<DishParts, "photo">> & {
    loading?: boolean;
  };

function Dish(props: IDishProps) {
  const { name, price, description, photo } = props;
  return (
    <div className="flex border-2 text-gray-800 hover:border-green-200 transition-all">
      <div className="flex-1 p-4 h-full flex flex-col overflow-hidden">
        <h3 className="font-light text-xl mb-3">{name}</h3>
        <div className="font-thin flex-1 overflow-ellipsis whitespace-nowrap overflow-hidden">
          {description}
        </div>
        <h5 className="mt-5 sm:10">₩{price}</h5>
      </div>
      <div
        className="w-5/12 ml-auto bg-cover bg-center bg-white"
        style={{
          backgroundImage: `url(${photo})`,
          paddingBottom: "40%",
        }}
      ></div>
    </div>
  );
}

export default Dish;
