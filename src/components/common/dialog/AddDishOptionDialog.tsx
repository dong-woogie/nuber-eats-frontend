import { useReactiveVar } from "@apollo/client";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useEffect, useState } from "react";
import { optionDialogVars } from "../../../apollo";
import { DishOptionInputType } from "../../../__generated__/globalTypes";
import Button from "../../Button";
import OptionChoice from "../OptionChoice";
import DialogWrap from "./DialogWrap";

interface IAddDishOptionDialogProps {
  onSubmit: (option: DishOptionInputType) => void;
}

function AddDishOptionDialog({ onSubmit }: IAddDishOptionDialogProps) {
  const dialog = useReactiveVar(optionDialogVars);

  const [optionState, setOptionState] = useState<DishOptionInputType>({
    name: "",
    choices: [],
  });

  useEffect(() => {
    if (dialog) return;
    setOptionState({
      name: "",
      choices: [],
    });
  }, [dialog]);

  const addOptionChoice = () => {
    let result: any;
    if (optionState.choices && optionState.choices[0]) {
      const id = (optionState?.choices[0]?.id || 0) + 1;
      result = { id };
    } else {
      result = { id: 1 };
    }
    setOptionState({
      ...optionState,
      choices: [...(optionState?.choices || []), result],
    });
  };
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setOptionState({
      ...optionState,
      [name]: name === "price" ? +value : value,
    });
  };
  const onChangeChoiceInput = (id: number, name: string, value: string) => {
    const changeChoices = optionState.choices?.map((choice) =>
      choice.id === id
        ? { ...choice, [name]: name === "price" ? +value : value }
        : choice
    );
    setOptionState({
      ...optionState,
      choices: changeChoices,
    });
  };
  const deleteOptionChoice = (id: number) => {
    const remainChoices = optionState.choices?.filter(
      (choice) => choice.id !== id
    );
    setOptionState({
      ...optionState,
      choices: remainChoices,
    });
  };
  const onSubmitOption = () => {
    onSubmit(optionState);
    optionDialogVars(false);
  };
  const onClose = () => optionDialogVars(false);

  if (!dialog) return null;
  return (
    <DialogWrap title="옵션추가" onClose={onClose} zIndex={30}>
      <div className="h-full">
        <div className="mt-10 w-full flex gap-10">
          <input
            name="name"
            type="name"
            className="input-base"
            placeholder="Option name"
            onChange={onChangeInput}
          />

          <input
            name="price"
            type="number"
            min={0}
            className="input-base"
            placeholder="Option price"
            onChange={onChangeInput}
          />
        </div>
        <div className="mt-10 flex items-center">
          <h4 className="text-lg font-medium">선택사항 추가하기</h4>
          <FontAwesomeIcon
            icon={faPlusCircle}
            className="ml-1 text-2xl text-red-500 hover:text-red-600 active:text-red-400 cursor-pointer"
            onClick={addOptionChoice}
          />
        </div>
        {optionState.choices?.map((choice) => (
          <OptionChoice
            id={choice.id || 0}
            key={choice.id}
            name={choice.name}
            price={choice.price}
            onChange={onChangeChoiceInput}
            onDelete={deleteOptionChoice}
          />
        ))}

        <div className="fixed-form-btn-wrap z-50" onClick={onSubmitOption}>
          <Button
            activeText="추가하기"
            loading={false}
            canClick={!!optionState.name}
            color="bg-red-600"
          />
        </div>
      </div>
    </DialogWrap>
  );
}

export default AddDishOptionDialog;
