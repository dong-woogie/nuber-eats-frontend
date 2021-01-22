import { useReactiveVar } from "@apollo/client";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import {
  addBasketAlertVars,
  basketsVars,
  selectDishFormVars,
} from "../../apollo";
import Button from "../common/Button";
import Checkbox from "../common/Checkbox";
import DialogWrap from "../common/DialogWrap";

interface IOption {
  name: string;
  price: number;
  choice?: string;
}

function SelectDishDialog() {
  const dish = useReactiveVar(selectDishFormVars);
  const baskets = basketsVars();
  const [selectOptions, setSelectOptions] = useState<IOption[] | null>(null);
  const [count, setCount] = useState<number>(1);
  const total = useMemo(() => {
    const optionTotal =
      selectOptions?.reduce((prev, curr) => prev + curr.price, 0) || 0;
    return (optionTotal + (dish?.price || 0)) * count;
  }, [selectOptions, count, dish]);

  const onCount = (type: "minus" | "plus") => () => {
    if (type === "minus" && count > 1) setCount(count - 1);
    if (type === "plus") setCount(count + 1);
  };
  const onCheck = (option: IOption) => () =>
    setSelectOptions((current) => {
      if (!current) return [option];
      if (current.find((select) => select.name === option.name)) {
        return current.filter((select) => select.name !== option.name);
      }
      return [option, ...current];
    });
  const onCheckChoice = (option: IOption) => () => {
    setSelectOptions((current) => {
      if (!current) return [option];
      const findOption = current.find((select) => select.name === option.name);

      if (!findOption) return [option, ...current];
      if (findOption.choice && findOption.choice === option.choice) {
        return current.filter((select) => select.choice !== option.choice);
      }
      return current.map((select) =>
        select.name === option.name ? option : select
      );
    });
  };
  const reset = () => {
    setCount(1);
    setSelectOptions(null);
    selectDishFormVars(null);
  };
  const onClose = () => selectDishFormVars(null);

  const onSubmit = () => {
    if (!dish?.id) return;

    const result = {
      dishId: dish.id + +new Date(),
      name: dish.name,
      price: dish.price,
      options: selectOptions,
      count,
      total,
    };

    if (baskets !== null && baskets?.restaurantId !== dish.restaurantId) {
      return addBasketAlertVars({
        onSubmit: () => {
          basketsVars({ restaurantId: dish.restaurantId, items: [result] });
          onClose();
        },
      });
    }
    basketsVars({
      restaurantId: dish.restaurantId,
      items: [...(baskets?.items || []), result],
    });
    onClose();
  };
  useEffect(() => {
    if (dish !== null) return;
    reset();
  }, [selectOptions, dish]);

  if (!dish) return null;
  return (
    <DialogWrap title={"주문하기"} onClose={onClose} zIndex={20}>
      <div className="mt-5 mb-20">
        <div className="flex flex-col items-center shadow-lg rounded-xl">
          <div
            className="py-20 px-20 sm:py-32 sm:px-32 bg-cover bg-center"
            style={{
              backgroundImage: `url(${dish.photo})`,
            }}
          ></div>
          <h4 className="py-5 text-lg font-medium">{dish.name}</h4>
        </div>

        <div className="mt-10 mb-5">
          <div className="text-xl font-semibold flex justify-between">
            <h3>기본</h3>
            <h3>{dish.price}원</h3>
          </div>
        </div>
        <hr />

        {dish.options && !!dish.options.length && (
          <div className="my-5">
            {dish.options?.map((option) => {
              if (option.choices && !!option.choices.length) {
                return (
                  <div key={option.name}>
                    <h3 className="mt-3 font-medium">{`${option.name} 선택1`}</h3>
                    {option.choices.map((choice) => (
                      <div className="py-3 flex items-center" key={choice.name}>
                        <Checkbox
                          label={choice.name}
                          checked={
                            selectOptions?.find(
                              (select) => select.name === option.name
                            )?.choice === choice.name
                          }
                          onChange={onCheckChoice({
                            name: option.name,
                            choice: choice.name,
                            price: choice.price || 0,
                          })}
                        />
                        <div className="ml-auto">{choice.price || 0}원</div>
                      </div>
                    ))}
                    <hr className="mb-5" />
                  </div>
                );
              }
              return (
                <div className="py-3 flex items-center" key={option.name}>
                  <Checkbox
                    onChange={onCheck({
                      name: option.name,
                      price: option.price || 0,
                    })}
                    checked={
                      !!selectOptions?.find(
                        (select) => select.name === option.name
                      )
                    }
                    label={option.name}
                  />
                  <div className="ml-auto">
                    <span>{option.price || 0}원</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="my-5 flex justify-between items-center">
          <div className="text-xl font-semibold">수량</div>
          <div className="w-32 px-3 py-2 shadow-xl rounded-3xl border-2 flex justify-between items-center">
            <div
              className={`w-8 h-8 flex justify-center items-center rounded-full ${
                count > 1
                  ? "hover:bg-gray-100 active:bg-gray-200  cursor-pointer"
                  : "text-gray-300"
              }`}
              onClick={onCount("minus")}
            >
              <FontAwesomeIcon icon={faMinus} className="text-sm mx-1" />
            </div>
            <span>{count}개</span>
            <div
              className="w-8 h-8 flex justify-center items-center hover:bg-gray-100 active:bg-gray-200 rounded-full cursor-pointer"
              onClick={onCount("plus")}
            >
              <FontAwesomeIcon icon={faPlus} className="text-sm mx-1" />
            </div>
          </div>
        </div>

        <div className="fixed-form-btn-wrap p-2 bg-white">
          <Button
            activeText={`${total}원 장바구니 담기`}
            color="bg-green-500"
            className="rounded-md"
            onClick={onSubmit}
          />
        </div>
      </div>
    </DialogWrap>
  );
}

export default SelectDishDialog;
