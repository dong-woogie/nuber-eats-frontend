import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { orderStatusCountVars } from "../../../apollo";
import {
  GET_OWNER_ORDERS,
  PENDING_ORDER_SUBSCRIPTION,
  PICKUP_ORDER_SUBSCRIPTION,
} from "../../../lib/graphql/order";
import {
  getOwnerOrders,
  getOwnerOrdersVariables,
} from "../../../__generated__/getOwnerOrders";
import { OrderStatus } from "../../../__generated__/globalTypes";
import { pendingOrder } from "../../../__generated__/pendingOrder";
import { pickupOrder } from "../../../__generated__/pickupOrder";

export const useOwnerOrders = (restaurantId: string | undefined) => {
  const [called, { data, subscribeToMore }] = useLazyQuery<
    getOwnerOrders,
    getOwnerOrdersVariables
  >(GET_OWNER_ORDERS);

  useEffect(() => {
    if (!restaurantId) return;
    called({
      variables: {
        input: {
          restaurantId: +restaurantId,
          statuses: [
            OrderStatus.Pending,
            OrderStatus.Cooking,
            OrderStatus.Cooked,
          ],
        },
      },
    });
  }, [called, restaurantId]);

  useEffect(() => {
    if (!subscribeToMore) return;
    subscribeToMore({
      document: PENDING_ORDER_SUBSCRIPTION,
      updateQuery: (
        prev,
        {
          subscriptionData: { data },
        }: { subscriptionData: { data: pendingOrder } }
      ) => {
        if (!data) return prev;
        return {
          getOwnerOrders: {
            ...prev.getOwnerOrders,
            orders: [...(prev.getOwnerOrders.orders || []), data.pendingOrder],
          },
        };
      },
    });
  }, [subscribeToMore]);

  useEffect(() => {
    if (!subscribeToMore || !restaurantId) return;
    subscribeToMore({
      document: PICKUP_ORDER_SUBSCRIPTION,
      variables: { input: { restaurantId: +restaurantId } },
      updateQuery(
        prev,
        {
          subscriptionData: { data },
        }: { subscriptionData: { data: pickupOrder } }
      ) {
        if (!data) return prev;
        const newOrders = (prev.getOwnerOrders.orders || []).filter(
          (order) => order.id !== data.pickupOrder.orderId
        );
        return {
          ...prev,
          getOwnerOrders: {
            ...prev.getOwnerOrders,
            orders: newOrders,
          },
        };
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribeToMore]);

  useEffect(() => {
    if (!data) return;

    const statusCount = data.getOwnerOrders.orders?.reduce(
      (prev, curr) => {
        if (curr.status === OrderStatus.Pending) {
          prev.wating += 1;
        } else if (curr.status === OrderStatus.Cooking) {
          prev.working += 1;
        } else if (curr.status === OrderStatus.Cooked) {
          prev.done += 1;
        }
        return prev;
      },
      { wating: 0, working: 0, done: 0 }
    );

    orderStatusCountVars(statusCount);
  }, [data]);

  return { data };
};
