import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import {
  getOrdersQuery,
  getOrdersQueryVariables,
} from "../../__generated__/getOrdersQuery";
import { OrderStatus } from "../../__generated__/globalTypes";
import { pendingOrder } from "../../__generated__/pendingOrder";
import { GET_ORDERS_QUERY, PENDING_ORDER_SUBSCRIPTION } from "../graphql/order";

export const useOrders = () => {
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

  return { data };
};
