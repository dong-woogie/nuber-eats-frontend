import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { orderStatusCountVars } from "../../../apollo";
import { GET_DRIVER_OWN_ORDERS } from "../../../lib/graphql/order";
import { getDriverOwnOrders } from "../../../__generated__/getDriverOwnOrders";
import { OrderStatus } from "../../../__generated__/globalTypes";

export const useDriverOwnOrders = () => {
  const { data } = useQuery<getDriverOwnOrders>(GET_DRIVER_OWN_ORDERS);

  useEffect(() => {
    const { working, done } = (data?.getDriverOwnOrders.orders || []).reduce(
      (prev, curr) => {
        if (curr.status === OrderStatus.Drivered) {
          prev.done += 1;
          return prev;
        } else {
          prev.working += 1;
          return prev;
        }
      },
      { working: 0, done: 0 }
    );

    const orderStatusCount = orderStatusCountVars();
    orderStatusCountVars({
      ...orderStatusCount,
      working,
      done,
    });
  }, [data]);

  return { data };
};
