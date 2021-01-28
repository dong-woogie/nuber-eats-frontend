import React from "react";
import { Link } from "react-router-dom";

interface IOrdersNav {
  status: string;
  restaurantId: string;
}

function OrdersNav({ status, restaurantId }: IOrdersNav) {
  return (
    <header className="flex text-white h-16 base-wrap-w">
      <Link
        to={`/orders/wating?restaurantId=${restaurantId}`}
        className={`flex-1 center h-full hover:bg-green-600 ${
          status === "wating" ? "bg-green-600" : "bg-green-500"
        }`}
      >
        대기중
      </Link>
      <Link
        to={`/orders/working?restaurantId=${restaurantId}`}
        className={`flex-1 center h-full hover:bg-green-600 ${
          status === "working" ? "bg-green-600" : "bg-green-500"
        }`}
      >
        진행중
      </Link>
      <Link
        to={`/orders/done?restaurantId=${restaurantId}`}
        className={`flex-1 center h-full hover:bg-green-600 ${
          status === "done" ? "bg-green-600" : "bg-green-500"
        }`}
      >
        완료
      </Link>
    </header>
  );
}

export default OrdersNav;
