import { useReactiveVar } from "@apollo/client";
import React from "react";
import { globalPositionVars, IStatus } from "../../apollo";
import DashboradNav from "../../components/order/DashboradNav";
import { orderStatusVars } from "../../apollo";
import { useLazyDriverOrders } from "./hooks/useLazyDriverOrders";
import { useDriverOwnOrders } from "./hooks/useDriverOwnOrders";
import DriverOrderItemGrid from "../../components/order/DriverOrderItemGrid";
import { OrderStatus } from "../../__generated__/globalTypes";

function Dashboard() {
  const status = useReactiveVar(orderStatusVars);
  const coords = useReactiveVar(globalPositionVars);

  const { data: ownOrderData } = useDriverOwnOrders();
  const { data: pendingOrdersData } = useLazyDriverOrders({
    lat: coords.lat,
    lng: coords.lng,
  });
  const onClickNav = (status: IStatus) => () => orderStatusVars(status);

  return (
    <div>
      <DashboradNav status={status} onClick={onClickNav} />
      {status === IStatus.wating && (
        <DriverOrderItemGrid
          orders={pendingOrdersData?.getDriverOrders.orders || []}
        />
      )}
      {status === IStatus.working && (
        <DriverOrderItemGrid
          orders={(ownOrderData?.getDriverOwnOrders.orders || []).filter(
            (order) => order.status !== OrderStatus.Drivered
          )}
        />
      )}
      {status === IStatus.done && (
        <DriverOrderItemGrid
          orders={(ownOrderData?.getDriverOwnOrders.orders || []).filter(
            (order) => order.status === OrderStatus.Drivered
          )}
        />
      )}
    </div>
  );
}

export default Dashboard;
