import React from "react";
import { getDriverOwnOrders_getDriverOwnOrders_orders } from "../../__generated__/getDriverOwnOrders";
import DriverOrderItem from "./DriverOrderItem";

interface IDriverOrderItemGridProps {
  orders: getDriverOwnOrders_getDriverOwnOrders_orders[];
}

function DriverOrderItemGrid({ orders }: IDriverOrderItemGridProps) {
  return (
    <div>
      {orders.map((order) => {
        return <DriverOrderItem order={order} key={order.id} />;
      })}
    </div>
  );
}

export default DriverOrderItemGrid;
