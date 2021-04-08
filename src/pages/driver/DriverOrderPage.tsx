import {
  useApolloClient,
  useMutation,
  useQuery,
  useReactiveVar,
} from "@apollo/client";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { globalPositionVars, messageAlertVars } from "../../apollo";
import Button from "../../components/common/Button";
import DriverMap from "../../components/order/DriverMap";
import DriverOrderTemplate from "../../components/order/DriverOrderTemplate";
import {
  EDIT_ORDER_MUTATION,
  GET_DRIVER_ORDER,
  GET_DRIVER_ORDERS,
  GET_DRIVER_OWN_ORDERS,
  ORDER_SUBSCRIPTION,
  TAKE_ORDER_MUTATION,
} from "../../lib/graphql/order";
import {
  editOrderMutation,
  editOrderMutationVariables,
} from "../../__generated__/editOrderMutation";
import {
  getDriverOrder,
  getDriverOrderVariables,
} from "../../__generated__/getDriverOrder";
import {
  getDriverOrders,
  getDriverOrdersVariables,
} from "../../__generated__/getDriverOrders";
import { getDriverOwnOrders } from "../../__generated__/getDriverOwnOrders";
import { OrderStatus } from "../../__generated__/globalTypes";
import { orderUpdate } from "../../__generated__/orderUpdate";
import {
  takeOrderMutation,
  takeOrderMutationVariables,
} from "../../__generated__/takeOrderMutation";

interface IParams {
  orderId: string;
}

function DriverOrderPage() {
  const { orderId } = useParams<IParams>();
  const coords = useReactiveVar(globalPositionVars);
  const { data, subscribeToMore } = useQuery<
    getDriverOrder,
    getDriverOrderVariables
  >(GET_DRIVER_ORDER, {
    variables: { input: { id: +orderId, lat: coords.lat, lng: coords.lng } },
  });

  const order = data?.getDriverOrder.order;

  const [takeOrder] = useMutation<
    takeOrderMutation,
    takeOrderMutationVariables
  >(TAKE_ORDER_MUTATION, {
    onCompleted,
  });
  const [editOrder] = useMutation<
    editOrderMutation,
    editOrderMutationVariables
  >(EDIT_ORDER_MUTATION);

  const onClickTakeOrder = () => {
    takeOrder({
      variables: { input: { id: +orderId } },
    });
  };

  const onClickEditOrder = (status: OrderStatus) => () => {
    editOrder({
      variables: { input: { id: +orderId, status } },
    });
  };

  const client = useApolloClient();
  const history = useHistory();
  const goBack = () => history.goBack();

  function onCompleted(data: takeOrderMutation) {
    if (!data.takeOrder.ok) {
      messageAlertVars(data.takeOrder.error || "");
      goBack();
    }

    const getDriverOrdersCache = client.readQuery<
      getDriverOrders,
      getDriverOrdersVariables
    >({
      query: GET_DRIVER_ORDERS,
      variables: { input: { lat: coords.lat, lng: coords.lng } },
    });
    const getDriverOwnOrdersCache = client.readQuery<getDriverOwnOrders>({
      query: GET_DRIVER_OWN_ORDERS,
    });

    if (!getDriverOrdersCache || !getDriverOwnOrdersCache) return;

    client.writeQuery<getDriverOrders, getDriverOrdersVariables>({
      query: GET_DRIVER_ORDERS,
      variables: { input: { lat: coords.lat, lng: coords.lng } },
      data: {
        ...getDriverOrdersCache,
        getDriverOrders: {
          ...getDriverOrdersCache.getDriverOrders,
          orders:
            getDriverOrdersCache.getDriverOrders.orders?.filter(
              (order) => order.id !== +orderId
            ) || [],
        },
      },
    });

    client.writeQuery<getDriverOwnOrders>({
      query: GET_DRIVER_OWN_ORDERS,
      data: {
        getDriverOwnOrders: {
          ...getDriverOwnOrdersCache.getDriverOwnOrders,
          orders: [
            data.takeOrder.order,
            ...(getDriverOwnOrdersCache.getDriverOwnOrders.orders || []),
          ],
        },
      },
    });
  }

  useEffect(() => {
    if (!subscribeToMore) return;
    subscribeToMore({
      document: ORDER_SUBSCRIPTION,
      variables: { input: { id: +orderId } },
      updateQuery(
        prev,
        {
          subscriptionData: { data },
        }: { subscriptionData: { data: orderUpdate } }
      ) {
        if (!data) return prev;
        return {
          ...prev,
          getDriverOrder: {
            ...prev.getDriverOrder,
            order: {
              ...prev.getDriverOrder.order,
              status: data.orderUpdate.status,
            },
          },
        };
      },
    });
  }, [subscribeToMore, orderId]);

  const buttonPropsByStatus = {
    [OrderStatus.Pending]: {
      text: "조리 전",
      onClick: undefined,
    },
    [OrderStatus.Cooking]: {
      text: "조리 중",
      onClick: undefined,
    },
    [OrderStatus.Cooked]: {
      text: "픽업하기",
      onClick: onClickEditOrder(OrderStatus.PickUp),
    },
    [OrderStatus.PickUp]: {
      text: "배달 완료하기",
      onClick: onClickEditOrder(OrderStatus.Drivered),
    },
    [OrderStatus.Drivered]: {
      text: "배달완료",
      onClick: undefined,
    },
  };

  if (!data?.getDriverOrder.order) return null;
  return (
    <div>
      <div className="card center cursor-pointer" onClick={goBack}>
        <h4 className="font-semibold">이전 페이지로 이동</h4>
      </div>
      <DriverMap order={data?.getDriverOrder.order} />
      <DriverOrderTemplate order={data?.getDriverOrder.order} />

      <div className="base-wrap-w">
        {!!!order?.driver ? (
          <Button
            activeText="배정하기"
            onClick={onClickTakeOrder}
            canClick={true}
            className="card mt-3 text-sm font-bold sm:mt-5 sm:text-base"
            color="bg-green-400"
          />
        ) : (
          <Button
            activeText={buttonPropsByStatus[order.status].text}
            onClick={buttonPropsByStatus[order.status].onClick}
            canClick={!!buttonPropsByStatus[order.status].onClick}
            className="card mt-3 text-sm font-bold sm:mt-5 sm:text-base"
            color="bg-green-400"
          />
        )}
      </div>
    </div>
  );
}

export default DriverOrderPage;
