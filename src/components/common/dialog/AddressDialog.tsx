import { useReactiveVar } from "@apollo/client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import DaumPostcode, { AddressData } from "react-daum-postcode";
import { addressDialogVars } from "../../../apollo";

function AddressDialog() {
  const addressDialog = useReactiveVar(addressDialogVars);
  const onClose = () => {
    addressDialogVars(null);
  };

  const onComplete = (data: AddressData) => {
    addressDialog?.onComplete(data.address);
    onClose();
  };

  if (addressDialog === null) return null;
  return (
    <div className="fixed flex flex-col w-full h-screen left-0 top-0 bg-white z-50">
      <div className="w-full flex justify-center items-center py-3">
        <h4 className="text-lg font-bold">주소 입력하기</h4>
        <div
          onClick={onClose}
          className="absolute w-10 h-10 p-3 rounded-full hover:bg-gray-200 cursor-pointer center right-0"
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="transform rotate-45 text-xl"
          />
        </div>
      </div>

      <div className={`flex-1 relative`}>
        <DaumPostcode onComplete={onComplete} height={"100%"} autoClose />
      </div>
    </div>
  );
}

export default AddressDialog;
