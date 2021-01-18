import { faEdit, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { DishOptionInputType } from "../../__generated__/globalTypes";

function OptionResult({
  option,
  index,
  onDelete,
}: {
  option: DishOptionInputType;
  index: number;
  onDelete: (id: number) => void;
}) {
  const onClickDeleteIcon = () => {
    onDelete(option.id || 0);
  };
  return (
    <div className="w-full flex items-center">
      <div className="flex-1 flex items-center flex-nowrap whitespace-nowrap font-base text-base max-w-max text-gray-500 h-full overflow-hidden overflow-ellipsis">
        <h4 className="text-gray-700 font-medium mr-5 w-10">옵션{index + 1}</h4>
        <h4 className="w-20 sm:w-30">{option.name}</h4>
        {option.price && <h4 className="ml-10">가격 : {option.price}</h4>}
        선택 :{" "}
        {!!option.choices?.length && (
          <div className="ml-10 overflow-ellipsis">
            {option.choices.reverse().map((choice) => (
              <span className="mr-3">
                {choice.name} - {choice.price}원
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-3 ml-auto">
        <FontAwesomeIcon
          icon={faEdit}
          className="ml-1 text-lg text-indigo-500 hover:text-indigo-600 active:text-indigo-400 cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faMinusCircle}
          className="ml-1 text-lg text-red-500 hover:text-red-600 active:text-red-400 cursor-pointer"
          onClick={onClickDeleteIcon}
        />
      </div>
      <hr />
    </div>
  );
}

export default OptionResult;
