import React from "react";
import { getOrderQuery_getOrder_order_items } from "../../__generated__/getOrderQuery";

interface IOrderItem {
  item: getOrderQuery_getOrder_order_items | null;
}

function OrderItem({ item }: IOrderItem) {
  if (!item) return null;
  return (
    <div className="border-b-2">
      <div className="flex justify-between">
        <span className="text-lg font-medium">{item.dish?.name}</span>
        <span className="text-lg font-medium">{item?.total}원</span>
      </div>
      <h5 className="text-gray-500 py-1 text-sm">
        • 기본 : {item.dish?.price}
      </h5>
      <div className="text-gray-500 text-sm py-1 overflow-ellipsis overflow-hidden whitespace-nowrap">
        <span>• 추가사항 : </span>
        {item.options ? (
          item.options?.map((option, index) => (
            <span className="mr-2" key={index}>
              {option.name}
              {option.choice}({option.price}원)
            </span>
          ))
        ) : (
          <span>X</span>
        )}
      </div>
    </div>
  );
}

export default OrderItem;
