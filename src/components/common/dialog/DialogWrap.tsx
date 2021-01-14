import React from "react";
import IconButton from "../IconButton";

interface IDialogWrapProps {
  children: React.ReactElement;
  title?: string;
  onClose: () => void;
}

function DialogWrap({ children, title, onClose }: IDialogWrapProps) {
  return (
    <div className="fixed w-full h-screen bg-white overflow-scroll">
      <div className="base-wrap-w">
        <div className="relative flex justify-center items-center py-2">
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
