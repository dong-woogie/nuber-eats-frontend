import React from "react";
import OrderSimpleItem from "../../../components/order/OrderSimpleItem";
import { useOrders } from "../../../lib/hooks/useOrders";

function WatingOrdersPage() {
  const { data } = useOrders();
  return (
    <div>
      {data?.getOrders.orders?.map((order) => (
        <OrderSimpleItem order={order} key={order.id} />
      ))}
    </div>
  );
}

export default WatingOrdersPage;
