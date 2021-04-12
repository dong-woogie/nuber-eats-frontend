import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import {
  ANOTHER_DRIVER_TAKE_ORDER,
  COOKED_ORDER_SUBSCRIPTION,
  GET_DRIVER_ORDERS,
} from "../../../lib/graphql/order";
import { anotherDriverTakeOrder } from "../../../__generated__/anotherDriverTakeOrder";
import { cookedOrder } from "../../../__generated__/cookedOrder";
import { IGlobalPosition, orderStatusCountVars } from "../../../apollo";
import {
  getDriverOrders,
  getDriverOrdersVariables,
} from "../../../__generated__/getDriverOrders";

export const useLazyDriverOrders = ({ lat, lng }: IGlobalPosition) => {
  const [called, { data, subscribeToMore }] = useLazyQuery<
    getDriverOrders,
    getDriverOrdersVariables
  >(GET_DRIVER_ORDERS);

  useEffect(() => {
    if (!subscribeToMore) return;
    subscribeToMore({
      document: COOKED_ORDER_SUBSCRIPTION,
      variables: { input: { lat, lng } },
      updateQuery(
        prev,
        {
          subscriptionData: { data },
        }: { subscriptionData: { data: cookedOrder } }
      ) {
        return {
          ...prev,
          getDriverOrders: {
            ...prev.getDriverOrders,
            orders: [...(prev.getDriverOrders.orders || []), data.cookedOrder],
          },
        };
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribeToMore, data]);

  useEffect(() => {
    if (!subscribeToMore) return;
    subscribeToMore({
      document: ANOTHER_DRIVER_TAKE_ORDER,
      variables: { input: { lat, lng } },
      updateQuery: (
        prev,
        {
          subscriptionData: { data },
        }: { subscriptionData: { data: anotherDriverTakeOrder } }
      ) => {
        if (!prev.getDriverOrders.orders || !data) return prev;
        return {
          getDriverOrders: {
            ...prev.getDriverOrders,
            orders: prev.getDriverOrders.orders.filter(
              (order) => order.id !== data.anotherDriverTakeOrder.orderId
            ),
          },
        };
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribeToMore]);

  useEffect(() => {
    if (!(lat && lng)) return;
    called({
      variables: { input: { lat, lng } },
    });
  }, [lat, lng, called]);

  useEffect(() => {
    if (!data) return;
    const count = (data?.getDriverOrders.orders || []).length;
    const orderStatusCount = orderStatusCountVars();
    orderStatusCountVars({
      ...orderStatusCount,
      wating: count,
    });
  }, [data]);

  return { called, data };
};
