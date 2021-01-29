import React from "react";
import { useParams } from "react-router-dom";
import OrderTemplate from "../../components/order/OrderTemplate";
import { useOrder } from "../../lib/hooks/useOrder";
interface IParams {
  orderId: string;
}

function OrderPage() {
  const { orderId } = useParams<IParams>();
  const { data } = useOrder(+orderId);

  return (
    <div className="base-wrap-w pb-20">
      <OrderTemplate order={data?.getOrder.order} />
      <div className="card mt-5 text-red-500 font-semibold text-center cursor-pointer active:text-red-400">
        주문내역 삭제하기
      </div>
    </div>
  );
}

export default OrderPage;
