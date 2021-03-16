import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { createAddressDialogVars } from "../../apollo";
import { useMe } from "../../lib/hooks/useMe";

function Address() {
  const { data } = useMe();
  const onClick = () => createAddressDialogVars(true);
  return (
    <div className="absolute w-full center cursor-pointer" onClick={onClick}>
      <h5 className="whitespace-nowrap overflow-ellipsis overflow-hidden font-bold text-sm text-gray-800">
        {data?.me.address ? data?.me.address : "주소 입력하기"}
        <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
      </h5>
    </div>
  );
}

export default Address;
