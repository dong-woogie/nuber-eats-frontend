import React from "react";
import IconButton from "./IconButton";

interface IDialogWrapProps {
  children: React.ReactElement;
  title?: string;
  zIndex?: 10 | 20 | 30 | 40 | 50;
  className?: string;
  onClose: () => void;
}

DialogWrap.defaultProps = {
  zIndex: 10,
};

function DialogWrap({
  children,
  title,
  onClose,
  zIndex,
  className,
}: IDialogWrapProps) {
  return (
    <div
      className={`fixed top-0 w-full h-screen bg-white overflow-scroll z-${zIndex} ${className} bg-scroll`}
    >
      <div className="base-wrap-w">
        <div className="relative flex justify-center items-center py-2 md:mt-10">
          <h3 className="font-semibold text-lg">{title}</h3>
          <div
            className="absolute left-0 h-full flex items-center"
            onClick={onClose}
          >
            <IconButton />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default DialogWrap;
