import { useQuery } from "@apollo/client";
import React from "react";
import OrderSimpleItem from "../../components/order/OrderSimpleItem";
import { GET_DRIVER_OWN_ORDERS } from "../../lib/graphql/order";
import { getDriverOwnOrders } from "../../__generated__/getDriverOwnOrders";

function WorkingOrdersPage() {
  const { data } = useQuery<getDriverOwnOrders>(GET_DRIVER_OWN_ORDERS);
  return (
    <div>
      {data?.getDriverOwnOrders.orders?.map((order) => (
        <OrderSimpleItem order={order} key={order.id} />
      ))}
    </div>
  );
}

export default WorkingOrdersPage;
