import {
  gql,
  useApolloClient,
  useMutation,
  useReactiveVar,
} from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createRestaurantDialogVars } from "../../../apollo";
import Button from "../../Button";
import DialogWrap from "./DialogWrap";
import FormError from "../../FormError";
import {
  createRestaurantMutation,
  createRestaurantMutationVariables,
} from "../../../__generated__/createRestaurantMutation";
import { MY_RESTAURANTS_QUERY } from "../../../lib/graphql/restaurant";
import { cacheMyRestaurantQuery } from "../../../lib/cache";
import FileInput from "../FileInput";
import { useFileInput } from "../hooks/useFileInput";

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
  const dialog = useReactiveVar(createRestaurantDialogVars);
  const { fileInput, onChangeFileInput, resetFileInput } = useFileInput();
  const client = useApolloClient();

  useEffect(() => {
    if (dialog) return;
    resetFileInput();
  }, [dialog, resetFileInput]);

  const onClose = () => createRestaurantDialogVars(false);
  const onSubmit = handleSubmit(() => {
    const { name, address, categoryName } = getValues();
    createRestaurant({
      variables: {
        input: {
          name,
          address,
          categoryName,
          coverImg: fileInput.coverImg,
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
        coverImg: fileInput.coverImg,
      }),
    });

    createRestaurantDialogVars(false);
  }

  if (!dialog) return null;
  return (
    <DialogWrap onClose={onClose} title="음식점 등록하기">
      <div className="mt-10">
        <form onSubmit={onSubmit} className="px-2 mb-14">
          <FileInput
            onChange={onChangeFileInput}
            uploadImg={fileInput.coverImg}
          />

          <input
            ref={register({ required: "name is required" })}
            type="name"
            name="name"
            placeholder="name"
            className="input-base"
          />
          {errors.name?.message && (
            <FormError errorMessage={errors.name?.message} />
          )}

          <input
            ref={register({ required: "address is required" })}
            type="text"
            name="address"
            placeholder="address"
            className="input-base"
          />
          {errors.address?.message && (
            <FormError errorMessage={errors.address?.message} />
          )}

          <input
            ref={register({ required: "categoryName is required" })}
            type="text"
            name="categoryName"
            placeholder="categoryName"
            className="input-base"
          />
          {errors.categoryName?.message && (
            <FormError errorMessage={errors.categoryName?.message} />
          )}

          <div className="fixed-form-btn-wrap">
            <Button
              activeText="등록완료"
              canClick={formState.isValid && !!fileInput.coverImg}
              loading={fileInput.loading || loading}
              color="bg-red-500"
            />
          </div>
        </form>
      </div>
    </DialogWrap>
  );
}

export default CreateRestaurantDialog;