import { useApolloClient, useMutation, useReactiveVar } from "@apollo/client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import DaumPostcode, { AddressData } from "react-daum-postcode";
import { useForm } from "react-hook-form";
import { addressDialogVars } from "../../../apollo";
import { CREATE_ADDRESS_MUTATION, ME_QUERY } from "../../../lib/graphql/user";
import {
  createAddress,
  createAddressVariables,
} from "../../../__generated__/createAddress";
import Button from "../Button";

interface IForm {
  detailAddress: string;
}

function AddressDialog() {
  const addressDialog = useReactiveVar(addressDialogVars);
  const [address, setAddress] = useState<string>();
  const [createMutation] = useMutation<createAddress, createAddressVariables>(
    CREATE_ADDRESS_MUTATION,
    {
      onCompleted,
    }
  );
  const { register, getValues, handleSubmit } = useForm<IForm>({
    mode: "onChange",
  });
  const onComplete = (data: AddressData) => {
    setAddress(data.address);
  };
  const onClose = () => {
    addressDialogVars(false);
  };
  const onSubmit = handleSubmit(() => {
    const { detailAddress } = getValues();
    createMutation({
      variables: { input: { address: address + " " + detailAddress } },
    });
  });
  const client = useApolloClient();
  function onCompleted(data: createAddress) {
    if (data.createAddress.ok) {
      client.writeQuery({
        query: ME_QUERY,
        data: { me: data.createAddress.user },
      });
      onClose();
    }
  }

  useEffect(() => {
    if (!addressDialog) setAddress("");
  }, [addressDialog]);

  if (!addressDialog) return null;
  return (
    <div className="fixed flex flex-col w-full h-screen left-0 top-0 bg-white">
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

      <div className={`${!address && "flex-1"} relative`}>
        <DaumPostcode onComplete={onComplete} height={"100%"} autoClose />
      </div>
      {Boolean(address) && (
        <div className={`flex-1 mt-10`}>
          <form className="w-full" onSubmit={onSubmit}>
            <div className="input w-full">{address}</div>
            <input
              ref={register}
              name="detailAddress"
              type="text"
              className="input w-full"
              placeholder="상세주소"
            />
            <Button
              activeText="이 주소로 변경하기"
              color="bg-blue-500"
              canClick={Boolean(address)}
              className="fixed-form-btn-wrap"
            />
          </form>
        </div>
      )}
    </div>
  );
}

export default AddressDialog;
