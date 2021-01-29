import React from "react";
import { Link } from "react-router-dom";
import { getOrdersQuery_getOrders_orders } from "../../__generated__/getOrdersQuery";

interface IOrderSimpleItemProps {
  order: getOrdersQuery_getOrders_orders;
}

function OrderSimpleItem({ order }: IOrderSimpleItemProps) {
  return (
    <div className="relative flex bg-gray-500 text-white border-b-2 border-gray-600 px-2 py-3 shadow-2xl">
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
        {order.total}원
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
