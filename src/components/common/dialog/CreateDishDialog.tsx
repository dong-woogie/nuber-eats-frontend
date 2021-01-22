import {
  gql,
  useApolloClient,
  useMutation,
  useReactiveVar,
} from "@apollo/client";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { createDishDialogVars, optionDialogVars } from "../../../apollo";
import { DISH_FRAGMENT } from "../../../fragments";
import { cacheDishQuqey } from "../../../lib/cache";
import { MY_RESTAURANT_QUERY } from "../../../lib/graphql/restaurant";
import {
  createDishMutation,
  createDishMutationVariables,
} from "../../../__generated__/createDishMutation";
import { DishOptionInputType } from "../../../__generated__/globalTypes";
import Button from "../../Button";
import FormError from "../../FormError";
import FileInput from "../FileInput";
import { useFileInput } from "../hooks/useFileInput";
import OptionResult from "../OptionResult";
import AddDishOptionDialog from "./AddDishOptionDialog";
import DialogWrap from "./DialogWrap";

const CREATE_DISH_MUTATION = gql`
  mutation createDishMutation($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
      dish {
        ...DishParts
      }
    }
  }
  ${DISH_FRAGMENT}
`;

interface IForm {
  name: string;
  price: number;
  description: string;
}
interface IParams {
  id: string;
}

function CreateDishDialog() {
  const { id: restaurantId } = useParams<IParams>();
  const [createDish, { loading }] = useMutation<
    createDishMutation,
    createDishMutationVariables
  >(CREATE_DISH_MUTATION, {
    onCompleted,
  });
  const dialog = useReactiveVar(createDishDialogVars);
  const onOpenOptionDialog = () => optionDialogVars(true);
  const {
    register,
    errors,
    getValues,
    formState,
    handleSubmit,
    reset,
  } = useForm<IForm>({
    mode: "onChange",
  });
  const { fileInput, onChangeFileInput, resetFileInput } = useFileInput();
  const [dishOptions, setDishOptions] = useState<DishOptionInputType[]>();

  useEffect(() => {
    if (dialog) return;
    resetFileInput();
    reset();
    setDishOptions([]);
  }, [dialog, reset, resetFileInput]);

  const onClose = () => createDishDialogVars(false);
  const addOption = (option: DishOptionInputType) => {
    if (!dishOptions?.length) {
      setDishOptions([{ id: 1, ...option }]);
    } else {
      setDishOptions([
        ...dishOptions,
        { ...{ id: dishOptions.slice(-1)[0].id || 1 }, ...option },
      ]);
    }
  };
  const onSubmit = handleSubmit(() => {
    const { name, price, description } = getValues();

    createDish({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId,
          photo: fileInput.coverImg,
          options: dishOptions,
        },
      },
    });
  });
  const onDeleteOption = (id: number) => {
    const filterOptions = dishOptions?.filter((option) => option.id !== id);
    setDishOptions(filterOptions);
  };

  const client = useApolloClient();

  async function onCompleted(data: createDishMutation) {
    const cacheQuery = client.readQuery({
      query: MY_RESTAURANT_QUERY,
      variables: { input: { restaurantId: +restaurantId } },
    });

    client.writeQuery({
      query: MY_RESTAURANT_QUERY,
      id: `Restaurant:${restaurantId}`,
      data: cacheDishQuqey(cacheQuery, data.createDish.dish),
    });
    onClose();
  }

  if (!dialog) return null;
  return (
    <>
      <DialogWrap title="메뉴 등록하기" onClose={onClose}>
        <div className="mt-10 mb-20">
          <form className="mt-10" onSubmit={onSubmit}>
            <FileInput
              onChange={onChangeFileInput}
              uploadImg={fileInput.coverImg}
            />

            <input
              className="input-base"
              type="name"
              name="name"
              ref={register({ required: "name is required" })}
              placeholder="name"
            />
            {errors.name?.message && (
              <FormError errorMessage={errors.name?.message} />
            )}
            <input
              className="input-base"
              type="number"
              name="price"
              ref={register({ required: "price is required" })}
              placeholder="price"
            />
            {errors.price?.message && (
              <FormError errorMessage={errors.price?.message} />
            )}
            <input
              className="input-base"
              type="text"
              name="description"
              ref={register({ required: "description is required" })}
              placeholder="description"
            />
            {errors.description?.message && (
              <FormError errorMessage={errors.description?.message} />
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

          <div className="flex justify-center mt-5 items-center">
            <h4 className="font-medium text-lg">옵션 추가하기</h4>
            <FontAwesomeIcon
              icon={faPlusCircle}
              className="ml-1 text-2xl text-red-500 hover:text-red-600 active:text-red-400 cursor-pointer"
              onClick={onOpenOptionDialog}
            />
          </div>

          <div className="mt-10">
            {dishOptions?.map((option, index) => (
              <OptionResult
                option={option}
                key={index}
                index={index}
                onDelete={onDeleteOption}
              />
            ))}
          </div>
        </div>
      </DialogWrap>
      <AddDishOptionDialog onSubmit={addOption} />
    </>
  );
}

export default CreateDishDialog;
