import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { messageAlertVars } from "../../apollo";
import { ORDER_STATUS_TEXT } from "../../constants";
import {
  getOrderQuery,
  getOrderQueryVariables,
} from "../../__generated__/getOrderQuery";
import { orderUpdate } from "../../__generated__/orderUpdate";
import { GET_ORDER_QUERY, ORDER_SUBSCRIPTION } from "../graphql/order";
export const useOrder = (orderId: number) => {
  const { data, subscribeToMore } = useQuery<
    getOrderQuery,
    getOrderQueryVariables
  >(GET_ORDER_QUERY, {
    variables: { input: { id: orderId } },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (!subscribeToMore || !orderId) return;

    subscribeToMore({
      document: ORDER_SUBSCRIPTION,
      variables: { input: { id: orderId } },
      updateQuery: (
        prev,
        {
          subscriptionData: { data },
        }: { subscriptionData: { data: orderUpdate } }
      ) => {
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
  }, [orderId, subscribeToMore]);

  return { data };
};
