import { useMutation } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import OrderTemplate from "../../components/order/OrderTemplate";
import { EDIT_ORDER_MUTATION } from "../../lib/graphql/order";
import { useOrder } from "../../lib/hooks/useOrder";
import {
  editOrderMutation,
  editOrderMutationVariables,
} from "../../__generated__/editOrderMutation";
import { OrderStatus } from "../../__generated__/globalTypes";

interface IParams {
  orderId: string;
}

function OwnerOrderPage() {
  const { orderId } = useParams<IParams>();
  const { data } = useOrder(+orderId);
  const [editOrder, { loading }] = useMutation<
    editOrderMutation,
    editOrderMutationVariables
  >(EDIT_ORDER_MUTATION);
  const handleClickEditOrder = (
    status: OrderStatus.Cooking | OrderStatus.Cooked
  ) => () => {
    editOrder({
      variables: { input: { id: +orderId, status } },
    });
  };
  return (
    <div className="base-wrap-w mb-20">
      <Link
        to={`/orders/wating?restaurantId=${data?.getOrder.order?.restaurant.id}`}
      >
        <div className="card text-center text-lg font-bold">주문 전체보기</div>
      </Link>
      <OrderTemplate order={data?.getOrder.order} />

      {data?.getOrder.order?.status === OrderStatus.Pending ? (
        <Button
          activeText="조리 시작하기"
          canClick={data?.getOrder.order?.status === OrderStatus.Pending}
          loading={loading}
          color={"bg-green-400"}
          className="card mt-5 text-lg font-bold"
          onClick={handleClickEditOrder(OrderStatus.Cooking)}
        />
      ) : (
        <Button
          activeText="조리완료"
          canClick={data?.getOrder.order?.status === OrderStatus.Cooking}
          loading={loading}
          color={"bg-green-400"}
          className="card mt-5 text-lg font-bold"
          onClick={handleClickEditOrder(OrderStatus.Cooked)}
        />
      )}
    </div>
  );
}

export default OwnerOrderPage;
