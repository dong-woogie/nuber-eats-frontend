import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent } from "react";

interface IOptionChoice {
  id: number;
  name?: string;
  price?: number | null;
  onChange: (id: number, name: string, value: string) => void;
  onDelete: (id: number) => void;
}

function OptionChoice({ id, onChange, onDelete, name, price }: IOptionChoice) {
  const onClickDeleteIcon = () => {
    onDelete(id);
  };
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(id, e.target.name, e.target.value);
  };
  return (
    <div className="mt-5 w-full flex items-center gap-5">
      <input
        name="name"
        type="text"
        value={name}
        placeholder="choice name"
        className="input-base"
        onChange={onChangeInput}
      />
      <input
        name="price"
        type="text"
        value={price || ""}
        placeholder="choice price"
        className="input-base"
        onChange={onChangeInput}
      />
      <FontAwesomeIcon
        icon={faMinusCircle}
        className="text-red-500 text-lg hover:text-red-600 active:text-red-400 cursor-pointer"
        onClick={onClickDeleteIcon}
      />
    </div>
  );
}

export default OptionChoice;
