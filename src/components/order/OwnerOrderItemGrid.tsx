import React from "react";
import { getOrdersQuery_getOrders_orders } from "../../__generated__/getOrdersQuery";
import OrderSimpleItem from "./OrderSimpleItem";

interface OwnerOrderItemGridProps {
  orders: getOrdersQuery_getOrders_orders[];
}

function OwnerOrderItemGrid({ orders }: OwnerOrderItemGridProps) {
  return (
    <div>
      {orders.map((order) => (
        <OrderSimpleItem order={order} key={order.id} />
      ))}
    </div>
  );
}

export default OwnerOrderItemGrid;
