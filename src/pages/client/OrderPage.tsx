import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { messageAlertVars } from "../../apollo";
import OrderTemplate from "../../components/order/OrderTemplate";
import { ORDER_STATUS_TEXT } from "../../constants";
import { GET_ORDER_FRAGMENT } from "../../fragments";
import { GET_ORDER_QUERY } from "../../lib/graphql/user";
import {
  getOrderQuery,
  getOrderQueryVariables,
} from "../../__generated__/getOrderQuery";
import { orderUpdate } from "../../__generated__/orderUpdate";

interface IParams {
  orderId: string;
}

const ORDER_SUBSCRIPTION = gql`
  subscription orderUpdate($input: OrderUpdatesInput!) {
    orderUpdate(input: $input) {
      ...GetOrderParts
    }
  }
  ${GET_ORDER_FRAGMENT}
`;

function OrderPage() {
  const { orderId } = useParams<IParams>();
  const { data, subscribeToMore } = useQuery<
    getOrderQuery,
    getOrderQueryVariables
  >(GET_ORDER_QUERY, { variables: { input: { id: +orderId } } });

  useEffect(() => {
    if (!data?.getOrder.ok) return;
    if (!subscribeToMore) return;
    subscribeToMore({
      document: ORDER_SUBSCRIPTION,
      variables: { input: { id: +orderId } },
      updateQuery(
        prev,
        {
          subscriptionData: { data },
        }: { subscriptionData: { data: orderUpdate } }
      ) {
        if (!data) return prev;
        messageAlertVars(ORDER_STATUS_TEXT[data.orderUpdate.status]);
        return {
          getOrder: {
            ...prev.getOrder,
            order: {
              ...data.orderUpdate,
            },
          },
        };
      },
    });
  }, [data, orderId, subscribeToMore]);

  return (
    <div className="base-wrap-w pb-20">
      <OrderTemplate order={data?.getOrder.order} />
      <div className="card mt-5 text-red-500 font-semibold text-center cursor-pointer active:text-red-400">
        주문내역 삭제하기
      </div>
    </div>
  );
}

export default OrderPage;
