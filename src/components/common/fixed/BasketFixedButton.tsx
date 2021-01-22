import { useReactiveVar } from "@apollo/client";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  basketDialogVars,
  basketsVars,
  messageAlertVars,
} from "../../../apollo";

function BasketFixedButton() {
  const baskets = useReactiveVar(basketsVars);
  const basketCount = baskets?.items.reduce(
    (prev, curr) => prev + curr.count,
    0
  );

  const onOpenBasketDialog = () => {
    if (baskets === null) return messageAlertVars("장바구니가 비어있습니다.");
    basketDialogVars(true);
  };
  return (
    <div
      onClick={onOpenBasketDialog}
      className="fixed-btn-wrap bg-green-400 hover:bg-green-500 active:bg-green-600 p-3 sm:p-5 borde cursor-pointer shadow-inner border-2 border-green-200"
    >
      <FontAwesomeIcon
        icon={faShoppingBasket}
        className="text-white text-3xl"
      />
      {baskets !== null && (
        <div className="top-1.5 right-1.5 sm:top-2.5 sm:right-3 absolute text-green-400 bg-white w-5 h-5 flex justify-center items-center rounded-full p-2">
          <span className="text-xs font-extrabold">{basketCount}</span>
        </div>
      )}
    </div>
  );
}

export default BasketFixedButton;
