import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function BasketFixedButton() {
  return (
    <div className="fixed-btn-wrap bg-green-400 hover:bg-green-500 active:bg-green-600 p-3 sm:p-5 borde cursor-pointer shadow-inner border-2 border-green-200">
      <FontAwesomeIcon
        icon={faShoppingBasket}
        className="text-white text-3xl"
      />
      <div className="top-1.5 right-1.5 sm:top-2.5 sm:right-3 absolute text-green-400 bg-white w-5 h-5 flex justify-center items-center rounded-full p-2">
        <span className="text-xs font-extrabold">2</span>
      </div>
    </div>
  );
}

export default BasketFixedButton;
