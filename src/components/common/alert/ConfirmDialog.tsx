import { useReactiveVar } from "@apollo/client";
import React from "react";
import { confirmDialogVars } from "../../../apollo";
import AlertWrap from "./AlertWrap";

function ConfirmDialog() {
  const confirmDialog = useReactiveVar(confirmDialogVars);
  const onClose = () => confirmDialogVars(null);

  const onConfirm = () => {
    confirmDialog?.onConfirm();
    onClose();
  };

  if (!confirmDialog) return null;
  return (
    <AlertWrap>
      <div className="bg-white rounded-xl w-full max-w-md mx-20">
        <div className="p-8 flex flex-col justify-center items-center">
          <h3 className="text-center font-semibold">{confirmDialog.title}</h3>
          <h4 className="text-center text-sm font-light mt-5">
            {confirmDialog.subTitle}
          </h4>
        </div>

        <div className="w-full border-t-2 flex">
          <button
            className="w-1/2 h-14 border-r-2 active:bg-gray-100 focus:outline-none"
            style={{
              borderBottomLeftRadius: "0.75rem",
            }}
            onClick={onClose}
          >
            {confirmDialog.cancelText || "취소"}
          </button>
          <button
            className="w-1/2 h-14 focus:outline-none active:bg-gray-100 font-semibold"
            style={{
              borderBottomRightRadius: "0.75rem",
            }}
            onClick={onConfirm}
          >
            {confirmDialog.confirmText || "확인"}
          </button>
        </div>
      </div>
    </AlertWrap>
  );
}

export default ConfirmDialog;
