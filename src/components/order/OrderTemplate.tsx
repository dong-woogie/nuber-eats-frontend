import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { ORDER_STATUS_TEXT } from "../../constants";
import { getOrderQuery_getOrder_order } from "../../__generated__/getOrderQuery";
import OrderItem from "./OrderItem";

interface IOrderTemplateProps {
  order?: getOrderQuery_getOrder_order | null;
}

function OrderTemplate({ order }: IOrderTemplateProps) {
  if (!order) return null;
  return (
    <>
      <div className="card mt-3">
        <h4
          className={`py-1 font-bold text-lg text-center ${
            order?.status === ORDER_STATUS_TEXT.Drivered
              ? "text-gray-500"
              : "text-red-500"
          }`}
        >
          {order && ORDER_STATUS_TEXT[order?.status]}
        </h4>
        <h3 className="py-1 text-lg font-bold">{order?.restaurant.name}</h3>
        <h4 className="font-mono py-1">
          {order?.items && order?.items[0].dish?.name}
          {order?.items && order.items.length > 1 ? (
            <span className="ml-2">외 {order.items.length}개</span>
          ) : (
            <span className="ml-2">1개</span>
          )}
        </h4>

        <h5 className="py-1 mt-5 font-thin text-sm">
          주문 일시 : {new Date(order?.createdAt).toLocaleDateString("ko")}
        </h5>
        <h5 className="font-thin text-sm">주문 번호 : {order?.id}</h5>

        <Link to={`/restaurants/${order?.restaurant.id}`}>
          <div className="py-3 text-center border-2 mt-3 rounded-lg hover:bg-green-50 active:bg-green-100">
            <FontAwesomeIcon icon={faHome} className="" />
            <span className="ml-2">가게보기</span>
          </div>
        </Link>
      </div>

      <div className="card mt-5">
        <div className="flex flex-col gap-7">
          {order?.items?.map((item, index) => (
            <OrderItem item={item} key={index} />
          ))}
        </div>
      </div>

      <div className="card mt-5">
        <div className="flex justify-between text-lg font-bold py-1">
          <h4>총주문금액</h4>
          <h4>{order?.total}원</h4>
        </div>
      </div>
    </>
  );
}

export default OrderTemplate;
