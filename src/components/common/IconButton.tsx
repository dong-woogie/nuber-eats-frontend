import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export enum Size {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

function IconButton({ size, className }: { size?: Size; className?: string }) {
  return (
    <button className="focus:outline-none w-10 h-10 hover:bg-gray-200 active:bg-gray-300 rounded-full transition-colors duration-500 ease-out">
      <FontAwesomeIcon
        icon={faArrowLeft}
        className={className + ` text-${size}`}
      />
    </button>
  );
}

IconButton.defaultProps = {
  size: "xl",
};

export default IconButton;
