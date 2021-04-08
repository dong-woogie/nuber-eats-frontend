import { useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";
import { globalPositionVars } from "../../apollo";
import OrderSimpleItem from "../../components/order/OrderSimpleItem";
import { OrderStatus } from "../../__generated__/globalTypes";
import { useLazyDriverOrders } from "./hooks/useLazyDriverOrders";

function WatingOrdersPage() {
  const coords = useReactiveVar(globalPositionVars);
  const { called, data } = useLazyDriverOrders(coords);

  useEffect(() => {
    if (!coords.lat || !coords.lng) return;
    called({
      variables: {
        input: {
          lat: coords.lat,
          lng: coords.lng,
        },
      },
    });
  }, [coords.lat, coords.lng, called]);

  return (
    <div>
      {data?.getDriverOrders.orders
        ?.filter(
          (order) =>
            order.status === OrderStatus.Cooking ||
            order.status === OrderStatus.Cooked ||
            !order.driver
        )
        .map((order) => (
          <OrderSimpleItem order={order} key={order.id} />
        ))}
    </div>
  );
}

export default WatingOrdersPage;
