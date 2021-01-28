import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
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
        console.log(data);
        return prev;
      },
    });
  }, [subscribeToMore]);

  return <div></div>;
}

export default WatingOrdersPage;
