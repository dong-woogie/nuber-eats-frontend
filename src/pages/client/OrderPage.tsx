import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_ORDER_FRAGMENT } from "../../fragments";
import { GET_ORDER_QUERY } from "../../lib/graphql/user";
import {
  getOrderQuery,
  getOrderQueryVariables,
} from "../../__generated__/getOrderQuery";
import { orderUpdates } from "../../__generated__/orderUpdates";

interface IParams {
  orderId: string;
}

const ORDER_SUBSCRIPTION = gql`
  subscription orderUpdates($input: OrderUpdatesInput!) {
    orderUpdates(input: $input) {
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
    subscribeToMore({
      document: ORDER_SUBSCRIPTION,
      variables: { input: { id: +orderId } },
      updateQuery(
        prev,
        {
          subscriptionData: { data },
        }: { subscriptionData: { data: orderUpdates } }
      ) {
        if (!data) return prev;
        return {
          getOrder: {
            ...prev.getOrder,
            order: {
              ...data.orderUpdates,
            },
          },
        };
      },
    });
  }, [data, orderId, subscribeToMore]);
  return (
    <div>
      <h1 className="font-semibold text-lg text-center">
        {data?.getOrder.order?.status}
      </h1>
    </div>
  );
}

export default OrderPage;
