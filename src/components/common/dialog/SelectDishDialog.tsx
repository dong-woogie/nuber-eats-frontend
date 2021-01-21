import { useReactiveVar } from "@apollo/client";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { basketsVars, selectDishFormVars } from "../../../apollo";
import Button from "../../Button";
import Checkbox from "../Checkbox";
import DialogWrap from "./DialogWrap";

interface IOption {
  name: string;
  price: number;
  choice?: string;
}

function SelectDishDialog() {
  const dish = useReactiveVar(selectDishFormVars);
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
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!dish?.id) return;
    basketsVars({
      restaurantId: dish.restaurantId,
      items: [
        {
          dishId: dish.id,
          name: dish.name,
          price: dish.price,
          options: selectOptions,
          count,
          total,
        },
      ],
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

        <form onSubmit={onSubmit}>
          {dish.options && !!dish.options.length && (
            <div className="my-5">
              {dish.options?.map((option) => {
                if (option.choices && !!option.choices.length) {
                  return (
                    <div key={option.name}>
                      <h3 className="text-xl font-semibold">{`${option.name} (선택1)`}</h3>
                      {option.choices.map((choice) => (
                        <div
                          className="py-3 flex items-center"
                          key={choice.name}
                        >
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

          <div className="fixed-form-btn-wrap p-2">
            <Button
              activeText={`${total}원 장바구니 담기`}
              color="bg-green-500"
              className="rounded-md"
            />
          </div>
        </form>
      </div>
    </DialogWrap>
  );
}

export default SelectDishDialog;
