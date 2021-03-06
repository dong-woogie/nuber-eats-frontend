import React from "react";
import { Link } from "react-router-dom";
import { useMe } from "../../lib/hooks/useMe";
import { distanceText } from "../../lib/utils";
import { getOrdersQuery_getOrders_orders } from "../../__generated__/getOrdersQuery";
import { UserRole } from "../../__generated__/globalTypes";

interface IOrderSimpleItemProps {
  order: getOrdersQuery_getOrders_orders;
}

function OrderSimpleItem({ order }: IOrderSimpleItemProps) {
  const { data } = useMe();
  const isDriver = data?.me.role === UserRole.Delivery;
  return (
    <div className="relative flex bg-gray-400 text-white border-t-2 px-2 py-3 shadow-2xl">
      <div className="flex-1 overflow-hidden">
        <h4>주문일시 - {new Date(order.createdAt).toLocaleTimeString("ko")}</h4>
        <h4>주문번호 - {order.id}</h4>
        {order.items?.map((item, index) => (
          <div
            className="overflow-hidden whitespace-nowrap overflow-ellipsis"
            key={index}
          >
            <span className="font-bold">{item.dish?.name} - </span>
            {item.options ? (
              item.options.map((option) => (
                <span className="mr-2" key={+new Date() + option.name}>
                  {option.name}
                  {option.choice && `(${option.choice})`}
                </span>
              ))
            ) : (
              <span> 추가 사항 X </span>
            )}
          </div>
        ))}
      </div>
      <div className="w-24 max-w-max px-2 center font-bold text-lg">
        {isDriver ? distanceText(order.distance || 0) : order.total + "원"}
      </div>

      <Link to={`/order/${order.id}`}>
        <div className="opacity-0 hover:opacity-100 absolute w-full h-full top-0 left-0 center cursor-pointer bg-black bg-opacity-40">
          <div className="opacity-100 font-bold">주문표 상세보기</div>
        </div>
      </Link>
    </div>
  );
}

export default OrderSimpleItem;
