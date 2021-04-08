import React from "react";
import { Link } from "react-router-dom";
import { distanceText } from "../../lib/utils";
import { getDriverOwnOrders_getDriverOwnOrders_orders } from "../../__generated__/getDriverOwnOrders";
import { useDistance } from "./hooks/useDistance";

interface IDriverOrderItemProps {
  order: getDriverOwnOrders_getDriverOwnOrders_orders;
}

function DriverOrderItem({ order }: IDriverOrderItemProps) {
  const {
    distanceTotal,
    distanceToRestaurant,
    distanceToDestination,
  } = useDistance(order);

  return (
    <Link to={`/order/${order.id}`}>
      <div className="py-3 px-5 bg-gray-700 border-0 font-semibold mb-1">
        <div className="border-b-2 border-gray-300 text-white flex justify-end py-1">
          <div className="">총거리 : {distanceText(distanceTotal)}</div>
        </div>
        <div className="mt-2">
          <div className="flex">
            <h4 className="text-lg text-white">{order.restaurant.name}</h4>
            <h5 className="text-sm text-gray-300 flex flex-col justify-center ml-2">
              ({distanceText(distanceToRestaurant)})
            </h5>
          </div>
          <div className="flex">
            <h4 className="text-white text-sm">
              목적지 : {order?.customer?.address}
            </h4>
            <h5 className="text-sm text-gray-300 flex flex-col justify-center ml-2">
              ({distanceText(distanceToDestination)})
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default DriverOrderItem;
