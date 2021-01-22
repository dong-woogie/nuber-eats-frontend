import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { IBasket } from "../../apollo";

interface ISelectDish {
  selectDish: IBasket;
  onCount: (dishId: number, count: number) => void;
  onDelete: (dishId: number) => void;
}

function SelectDish({ selectDish, onCount, onDelete }: ISelectDish) {
  const onClickDishCount = (type: "plus" | "minus") => () => {
    if (type === "minus" && selectDish.count === 1) return;
    const count = type === "plus" ? selectDish.count + 1 : selectDish.count - 1;
    onCount(selectDish.dishId, count);
  };
  const onDeleteSelectDish = () => {
    onDelete(selectDish.dishId);
  };
  return (
    <div className="relative base-wrap-w bg-white mt-5 py-3 border-b-2 border-gray-200">
      <div
        onClick={onDeleteSelectDish}
        className="absolute right-3 top-3 w-10 h-10 hover:bg-gray-100 rounded-full flex items-center justify-center cursor-pointer active:bg-gray-200"
      >
        <FontAwesomeIcon
          icon={faPlus}
          className="text-gray-400 text-xl transform rotate-45"
        />
      </div>
      <h4 className="my-3">{selectDish.name}</h4>
      <h5 className="text-sm text-gray-500"> • 기본 : {selectDish?.price}원</h5>
      <h5 className="text-sm text-gray-500">
        {" "}
        • 옵션 :{" "}
        {selectDish.options?.map((option) => (
          <span className="text-sm text-gray-500 mr-2" key={option.name}>
            {option.choice ? option.choice : option.name} ( +{option.price || 0}
            원 )
          </span>
        ))}
      </h5>
      <div className="flex items-center justify-between mt-6">
        <h4 className="font-medium">{selectDish.total * selectDish.count}원</h4>
        <div className="w-32 px-3 py-2 shadow-xl rounded-3xl border-2 flex justify-between items-center">
          <div
            onClick={onClickDishCount("minus")}
            className={`w-8 h-8 flex justify-center items-center rounded-full ${
              (selectDish.count || 0) > 1
                ? "hover:bg-gray-100 active:bg-gray-200  cursor-pointer"
                : "text-gray-300"
            }`}
          >
            <FontAwesomeIcon icon={faMinus} className="text-sm mx-1" />
          </div>
          <span>{selectDish.count}개</span>
          <div
            onClick={onClickDishCount("plus")}
            className="w-8 h-8 flex justify-center items-center hover:bg-gray-100 active:bg-gray-200 rounded-full cursor-pointer"
          >
            <FontAwesomeIcon icon={faPlus} className="text-sm mx-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectDish;
