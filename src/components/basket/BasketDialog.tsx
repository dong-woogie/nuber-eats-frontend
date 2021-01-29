import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { basketDialogVars, basketsVars, confirmDialogVars } from "../../apollo";
import { CREATE_ORDER_MUTATION } from "../../lib/graphql/order";
import { RESTAURANT_QUERY } from "../../lib/graphql/restaurant";
import {
  createOrderMutation,
  createOrderMutationVariables,
} from "../../__generated__/createOrderMutation";
import {
  restaurantQuery,
  restaurantQueryVariables,
} from "../../__generated__/restaurantQuery";
import Button from "../common/Button";
import IconButton from "../common/IconButton";
import SelectDish from "./SelectDish";

function BasketDialog() {
  const baskets = useReactiveVar(basketsVars);
  const restaurant = useQuery<restaurantQuery, restaurantQueryVariables>(
    RESTAURANT_QUERY,
    { variables: { input: { restaurantId: baskets?.restaurantId || 0 } } }
  );
  const [createOrder] = useMutation<
    createOrderMutation,
    createOrderMutationVariables
  >(CREATE_ORDER_MUTATION, {
    onCompleted,
  });
  const history = useHistory();

  const onClose = () => {
    basketDialogVars(false);
  };

  const reset = () => {
    basketsVars(null);
    onClose();
  };

  const onCount = (dishId: number, count: number) => {
    const newItems = baskets?.items?.map((item) =>
      item.dishId === dishId ? { ...item, count } : item
    );
    basketsVars({
      ...baskets,
      items: newItems,
    });
  };

  const onDelete = (dishId: number) => {
    const newItem = baskets?.items?.filter(
      (item) => item.selectDishId !== dishId
    );

    if (newItem?.length === 0) return basketsVars(null);

    basketsVars({
      ...baskets,
      items: newItem,
    });
  };

  const total = useMemo(() => {
    return baskets?.items?.reduce(
      (prev, curr) => prev + curr.total * curr.count,
      0
    );
  }, [baskets]);

  const onClickToOrder = () => {
    confirmDialogVars({
      title: "주문하시겠습니까?",
      confirmText: "주문하기",
      onConfirm,
    });
  };

  const onConfirm = () => {
    if (baskets === null || !baskets?.restaurantId || !baskets.items) return;
    createOrder({
      variables: {
        input: {
          restaurantId: baskets.restaurantId,
          items: baskets.items?.map((item) => ({
            dishId: item.dishId,
            options: item.options,
          })),
        },
      },
    });
  };

  function onCompleted(data: createOrderMutation) {
    if (data.createOrder.ok) {
      history.push(`/orders/${data.createOrder.orderId}`);
      reset();
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-30 bg-gray-200">
      <div className="flex flex-col h-screen ">
        <div className=" bg-white  border-b-2 border-gray-200 py-2">
          <div className="w-full base-wrap-w relative flex justify-center">
            <h3 className="font-medium text-lg">장바구니</h3>
            <div
              className="absolute left-0 top-0 h-full flex items-center"
              onClick={onClose}
            >
              <IconButton />
            </div>
          </div>
        </div>

        {baskets === null && (
          <div className="flex-1 flex justify-center items-center bg-gray-50">
            <div className="mb-wrap text-center">
              <h1 className="font-semibold text-7xl text-gray-800 mb-5 ">텅</h1>
              <h4 className="text-lg font-light ">장바구니가 텅 비어있어요</h4>
            </div>
          </div>
        )}

        {baskets !== null && (
          <div className="overflow-scroll mb-20">
            <div className="bg-white mt-5 py-3 border-b-2 border-gray-300">
              <div className="base-wrap-w">
                <h3 className="font-semibold text-xl">
                  {restaurant.data?.restaurant.result?.name}
                </h3>
              </div>
            </div>

            <div className="bg-white">
              {baskets?.items?.map((selectDish) => (
                <SelectDish
                  key={selectDish.selectDishId}
                  selectDish={selectDish}
                  onCount={onCount}
                  onDelete={onDelete}
                />
              ))}
            </div>

            <div className="bg-white py-4 cursor-pointer" onClick={onClose}>
              <div className="base-wrap-w text-green-400 flex justify-center items-center active:opacity-70">
                <FontAwesomeIcon icon={faPlus} />
                <span className="ml-2 font-medium">더 담으러 가기</span>
              </div>
            </div>

            <div className="bg-white py-4 mt-5">
              <div className="base-wrap-w flex justify-between">
                <h4 className="font-semibold">총 주문금액</h4>
                <h4 className="font-semibold">{total}원</h4>
              </div>
            </div>

            <div className="fixed-form-btn-wrap p-2">
              <Button
                activeText={`${total}원 주문하기`}
                color="bg-green-500"
                className="rounded-md"
                onClick={onClickToOrder}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BasketDialog;
