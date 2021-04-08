import React from "react";
import { DRIVER_ORDER_STATUS_TEXT } from "../../constants";
import { distanceText } from "../../lib/utils";
import { getDriverOrder_getDriverOrder_order } from "../../__generated__/getDriverOrder";
import { useDistance } from "./hooks/useDistance";

interface DriverOrderTemplateProps {
  order: getDriverOrder_getDriverOrder_order;
}

function DriverOrderTemplate({ order }: DriverOrderTemplateProps) {
  const {
    distanceTotal,
    distanceToDestination,
    distanceToRestaurant,
  } = useDistance(order);

  if (!order) return null;
  return (
    <div className="base-wrap-w">
      <div className="card mt-2">
        <h4 className={`py-1 font-bold text-lg text-center text-red-500`}>
          {order.driver
            ? DRIVER_ORDER_STATUS_TEXT[order.status]
            : "배달원이 선정되지 않았어요."}
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

        <h5 className="mt-2 font-thin text-sm">
          주문 일시 : {new Date(order?.createdAt).toLocaleDateString("ko")}
        </h5>
        <h5 className="font-thin text-sm">주문 번호 : {order?.id}</h5>

        <h4 className="mt-2 font-thin text-sm">
          음식점 주소 - {order.restaurant.address}
        </h4>
        <h4 className="font-thin text-sm">
          음식점까지의 거리 - {distanceText(distanceToRestaurant)}
        </h4>

        <h4 className="font-thin text-sm">
          배달지 주소 - {order.customer?.address}
        </h4>
        <h4 className="font-thin text-sm">
          도착지까지의 거리 - {distanceText(distanceToDestination)}
        </h4>

        <div className="mt-2 text-sm font-semibold">
          총거리 - {distanceText(distanceTotal)}
        </div>
      </div>
    </div>
  );
}

export default DriverOrderTemplate;
