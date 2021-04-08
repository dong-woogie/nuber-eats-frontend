import { useReactiveVar } from "@apollo/client";
import { useMemo } from "react";
import { globalPositionVars } from "../../../apollo";
import { distanceCalc } from "../../../lib/utils";
import { getDriverOwnOrders_getDriverOwnOrders_orders } from "../../../__generated__/getDriverOwnOrders";

export const useDistance = (
  order: getDriverOwnOrders_getDriverOwnOrders_orders
) => {
  const coords = useReactiveVar(globalPositionVars);
  const distanceToRestaurant = useMemo(() => {
    if (!(coords.lat && coords.lng && order.restaurant.position?.coordinates)) {
      return 0;
    }
    return distanceCalc(coords, {
      lat: order.restaurant.position.coordinates[0],
      lng: order.restaurant.position.coordinates[1],
    });
  }, [order.restaurant.position?.coordinates, coords]);

  const distanceToDestination = useMemo(() => {
    if (
      !(
        order.restaurant?.position?.coordinates &&
        order.customer?.position?.coordinates
      )
    ) {
      return 0;
    }
    return distanceCalc(
      {
        lat: order.restaurant.position.coordinates[0],
        lng: order.restaurant.position.coordinates[1],
      },
      {
        lat: order.customer.position.coordinates[0],
        lng: order.customer.position.coordinates[1],
      }
    );
  }, [
    order.customer?.position.coordinates,
    order.restaurant?.position?.coordinates,
  ]);

  const distanceTotal = useMemo(() => {
    const distance = distanceToRestaurant + distanceToDestination;
    return +distance.toFixed(3);
  }, [distanceToRestaurant, distanceToDestination]);

  return { distanceTotal, distanceToRestaurant, distanceToDestination };
};
