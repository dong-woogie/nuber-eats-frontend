import React from "react";

interface IMoreViewBtnProps {
  onClick: () => void;
}

function MoreViewBtn({ onClick }: IMoreViewBtnProps) {
  return (
    <div className="base-wrap base-wrap-w mb-10">
      <button
        className="focus:outline-none bg-black text-white p-3"
        onClick={onClick}
      >
        MORE VIEW
      </button>
    </div>
  );
}

export default MoreViewBtn;
