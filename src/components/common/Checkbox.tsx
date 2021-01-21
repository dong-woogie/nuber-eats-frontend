import {
  faCheckSquare,
  faMinusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface ICheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: () => void;
}

function Checkbox({ checked, label, disabled, onChange }: ICheckboxProps) {
  return (
    <div className="relative">
      {disabled ? (
        <FontAwesomeIcon
          icon={faMinusSquare}
          className="text-2xl text-gray-700 absolute"
        />
      ) : (
        <FontAwesomeIcon
          icon={faCheckSquare}
          className={` ${
            checked
              ? "text-green-300 active:text-green-200"
              : "text-gray-300 active:text-gray-200"
          } absolute text-2xl active:transform active:scale-95 cursor-pointer`}
          onClick={onChange}
        />
      )}

      <label className="ml-7">{label}</label>
    </div>
  );
}

export default Checkbox;
