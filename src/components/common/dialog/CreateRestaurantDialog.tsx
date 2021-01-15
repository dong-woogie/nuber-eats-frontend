import {
  gql,
  useApolloClient,
  useMutation,
  useReactiveVar,
} from "@apollo/client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { createRestaurantDialogVars } from "../../../apollo";
import Button from "../../Button";
import DialogWrap from "./DialogWrap";
import CameraImage from "../../../images/camera.svg";
import FormError from "../../FormError";
import {
  createRestaurantMutation,
  createRestaurantMutationVariables,
} from "../../../__generated__/createRestaurantMutation";
import { MY_RESTAURANTS_QUERY } from "../../../lib/graphql/restaurant";
import { cacheMyRestaurantQuery } from "../../../lib/cache";

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
}

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurantMutation($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
      restaurantId
    }
  }
`;

function CreateRestaurantDialog() {
  const {
    register,
    errors,
    handleSubmit,
    formState,
    getValues,
  } = useForm<IFormProps>({
    mode: "onChange",
  });
  const [createRestaurant, { loading }] = useMutation<
    createRestaurantMutation,
    createRestaurantMutationVariables
  >(CREATE_RESTAURANT_MUTATION, {
    onCompleted,
  });
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const dialog = useReactiveVar(createRestaurantDialogVars);
  const [uploadFile, setUploadFile] = useState({
    coverImg: "",
    loading: false,
  });
  const client = useApolloClient();

  const onClose = () => createRestaurantDialogVars(false);
  const onClickFileInput = () => {
    if (uploadInputRef.current === null) return;
    uploadInputRef.current.click();
  };
  const onChangeFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const file = e.target.files && e.target.files[0];
    formData.append("file", file || "");

    setUploadFile({
      ...uploadFile,
      loading: true,
    });
    const { url } = await (
      await fetch("http://localhost:4000/uploads", {
        method: "post",
        body: formData,
      })
    ).json();

    setUploadFile({
      coverImg: url,
      loading: false,
    });
  };
  const onSubmit = handleSubmit(() => {
    const { name, address, categoryName } = getValues();
    createRestaurant({
      variables: {
        input: {
          name,
          address,
          categoryName,
          coverImg: uploadFile.coverImg,
        },
      },
    });
  });

  function onCompleted(data: createRestaurantMutation) {
    const {
      createRestaurant: { ok, restaurantId },
    } = data;
    if (!ok || restaurantId === null) return;
    const { name, address, categoryName } = getValues();
    const cacheQuery = client.readQuery({
      query: MY_RESTAURANTS_QUERY,
    });

    client.writeQuery({
      query: MY_RESTAURANTS_QUERY,
      data: cacheMyRestaurantQuery(cacheQuery, {
        id: restaurantId,
        name,
        categoryName,
        address,
        coverImg: uploadFile.coverImg,
      }),
    });

    createRestaurantDialogVars(false);
  }

  useEffect(() => {
    if (dialog) return;
    setUploadFile({ coverImg: "", loading: false });
  }, [dialog]);

  if (!dialog) return null;
  return (
    <DialogWrap onClose={onClose} title="음식점 등록하기">
      <div className="mt-10">
        <form onSubmit={onSubmit} className="px-2">
          <div className="relative flex">
            <div
              className="relative w-24 h-24 bg-cover bg-center bg-no-repeat border border-gray-300 cursor-pointer mb-10"
              style={{
                backgroundImage: `url(${CameraImage})`,
                backgroundSize: "32px",
              }}
              onClick={onClickFileInput}
            >
              <input
                ref={uploadInputRef}
                placeholder="photo"
                type="file"
                name="file"
                multiple
                className="top-0 left-0 abolute w-full h-full cursor-pointer hidden"
                onChange={onChangeFileInput}
                accept="image/*"
              />
            </div>
            {uploadFile.coverImg && (
              <div
                className="absolute w-24 h-24 bg-cover bg-center bg-no-repeat left-32 z-10"
                style={{ backgroundImage: `url(${uploadFile.coverImg})` }}
              ></div>
            )}
          </div>

          <input
            ref={register({ required: "name is required" })}
            type="name"
            name="name"
            placeholder="name"
            className="py-5 px-3 border-gray-300 border-b-2 focus:outline-none w-full mb-5"
          />
          {errors.name?.message && (
            <FormError errorMessage={errors.name?.message} />
          )}

          <input
            ref={register({ required: "address is required" })}
            type="text"
            name="address"
            placeholder="address"
            className="py-5 px-3 border-gray-300 border-b-2 focus:outline-none w-full mb-5"
          />
          {errors.address?.message && (
            <FormError errorMessage={errors.address?.message} />
          )}

          <input
            ref={register({ required: "categoryName is required" })}
            type="text"
            name="categoryName"
            placeholder="categoryName"
            className="py-5 px-3 border-gray-300 border-b-2 focus:outline-none w-full mb-5"
          />
          {errors.categoryName?.message && (
            <FormError errorMessage={errors.categoryName?.message} />
          )}

          <div className="fixed w-full left-0 bottom-0">
            <Button
              activeText="등록완료"
              canClick={formState.isValid && !!uploadFile.coverImg}
              loading={uploadFile.loading || loading}
              color="bg-red-500"
            />
          </div>
        </form>
      </div>
    </DialogWrap>
  );
}

export default CreateRestaurantDialog;
