import React from "react";
import { useLocation } from "react-router-dom";
import DashboradNav from "../../components/order/DashboradNav";

import * as qs from "query-string";
import OwnerOrderItemGrid from "../../components/order/OwnerOrderItemGrid";
import { OrderStatus } from "../../__generated__/globalTypes";
import { useOwnerOrders } from "./hooks/useOwnerOrders";
import { useReactiveVar } from "@apollo/client";
import { IStatus, orderStatusVars } from "../../apollo";

function OwnerOrdersPage() {
  const location = useLocation();
  const { restaurantId }: { restaurantId?: string } = qs.parse(location.search);
  const status = useReactiveVar(orderStatusVars);
  const { data } = useOwnerOrders(restaurantId);

  const onClickNav = (status: IStatus) => () => orderStatusVars(status);

  if (!restaurantId) return null;
  return (
    <div>
      <DashboradNav status={status} onClick={onClickNav} />

      {status === IStatus.wating && (
        <OwnerOrderItemGrid
          orders={
            data?.getOwnerOrders?.orders?.filter(
              (order) => order.status === OrderStatus.Pending
            ) || []
          }
        />
      )}
      {status === IStatus.working && (
        <OwnerOrderItemGrid
          orders={
            data?.getOwnerOrders?.orders?.filter(
              (order) => order.status === OrderStatus.Cooking
            ) || []
          }
        />
      )}
      {status === IStatus.done && (
        <OwnerOrderItemGrid
          orders={
            data?.getOwnerOrders?.orders?.filter(
              (order) => order.status === OrderStatus.Cooked
            ) || []
          }
        />
      )}
    </div>
  );
}

export default OwnerOrdersPage;
