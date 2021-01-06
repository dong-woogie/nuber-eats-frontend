import React from "react";

interface IRestaurantProps {
  id: string;
  coverImg?: string | null;
  name: string;
  categoryName?: string;
}

function Restaurant({ id, coverImg, name, categoryName }: IRestaurantProps) {
  return (
    <div key={id}>
      <div
        className="bg-gray-100 shadow-md py-20 sm:py-28 bg-cover bg-center"
        style={{ backgroundImage: `url(${coverImg})` }}
      ></div>
      <h3 className="text-lg mt-3">{name}</h3>
      <hr className="my-2" />
      <span className="text-sm font-light text-gray-700">{categoryName}</span>
    </div>
  );
}

export default Restaurant;
