import React from "react";

interface IButtonProps {
  activeText: string;
  canClick: boolean;
  loading: boolean;
}

function Button({ activeText, canClick, loading }: IButtonProps) {
  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <button
      role={"button"}
      className={`
      py-4  text-white focus:outline-none  transition-colors
      ${
        canClick
          ? "bg-lime-600 hover:bg-lime-700 active:bg-lime-800"
          : "bg-gray-300 pointer-events-none"
      }`}
    >
      {loading ? "loading...." : activeText}
    </button>
  );
}

export default Button;
