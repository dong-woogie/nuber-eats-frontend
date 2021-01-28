import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import OrderSimpleItem from "../../../components/order/OrderSimpleItem";
import { GET_ORDER_FRAGMENT } from "../../../fragments";
import {
  getOrdersQuery,
  getOrdersQueryVariables,
} from "../../../__generated__/getOrdersQuery";
import { OrderStatus } from "../../../__generated__/globalTypes";
import { pendingOrder } from "../../../__generated__/pendingOrder";

const GET_ORDERS_QUERY = gql`
  query getOrdersQuery($input: GetOrdersInput!) {
    getOrders(input: $input) {
      ok
      error
      orders {
        ...GetOrderParts
      }
    }
  }
  ${GET_ORDER_FRAGMENT}
`;

const PENDING_ORDER_SUBSCRIPTION = gql`
  subscription pendingOrder {
    pendingOrder {
      ...GetOrderParts
    }
  }
  ${GET_ORDER_FRAGMENT}
`;

function WatingOrdersPage() {
  const { data, subscribeToMore } = useQuery<
    getOrdersQuery,
    getOrdersQueryVariables
  >(GET_ORDERS_QUERY, {
    variables: { input: { status: OrderStatus.Pending } },
  });

  useEffect(() => {
    subscribeToMore({
      document: PENDING_ORDER_SUBSCRIPTION,
      updateQuery(
        prev,
        {
          subscriptionData: { data },
        }: { subscriptionData: { data: pendingOrder } }
      ) {
        if (!data) return prev;
        return {
          getOrders: {
            ...prev.getOrders,
            orders: [...(prev.getOrders.orders || []), data.pendingOrder],
          },
        };
      },
    });
  }, [subscribeToMore]);
  return (
    <div>
      {data?.getOrders.orders?.map((order) => (
        <OrderSimpleItem order={order} key={order.id} />
      ))}
    </div>
  );
}

export default WatingOrdersPage;
