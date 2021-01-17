import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface ICircleButtonProps {
  dialog: boolean;
  onToggle: () => void;
  color?: string;
}

function CircleButton({ dialog, onToggle, color }: ICircleButtonProps) {
  return (
    <FontAwesomeIcon
      icon={faPlusCircle}
      className={`
      text-6xl 
      xl:text-7xl 
      rounded-full 
      cursor-pointer
      transition-all ease-in duration-200
      ${dialog && `transform rotate-45`}
      ${dialog ? `text-white` : color}
    `}
      onClick={onToggle}
    />
  );
}

CircleButton.defaultProps = {
  color: "text-red-300",
};

export default CircleButton;
