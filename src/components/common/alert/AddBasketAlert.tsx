import React from "react";
import { addBasketAlertVars } from "../../../apollo";
import AlertWrap from "./AlertWrap";

function AddBasketAlert() {
  const alertVars = addBasketAlertVars();
  const onClose = () => addBasketAlertVars(null);
  const onSubmit = () => {
    alertVars?.onSubmit();
    onClose();
  };
  if (!alertVars) return null;
  return (
    <AlertWrap>
      <div className="bg-white rounded-xl mx-5">
        <div className="p-8 flex flex-col justify-center items-center">
          <h3 className="text-center font-semibold">
            장바구니에는 같은 가게의 메뉴만 담을 수 있습니다.
          </h3>
          <h4 className="text-center text-sm font-light mt-5">
            선택하신 메뉴를 장바구니에 담을 경우 이전에 담은 메뉴가 삭제됩니다.
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
            취소
          </button>
          <button
            className="w-1/2 h-14 focus:outline-none active:bg-gray-100 font-semibold"
            style={{
              borderBottomRightRadius: "0.75rem",
            }}
            onClick={onSubmit}
          >
            담기
          </button>
        </div>
      </div>
    </AlertWrap>
  );
}

export default AddBasketAlert;
