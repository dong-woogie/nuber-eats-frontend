import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import qs from "query-string";
import OrdersNav from "../../../components/order/OrdersNav";
import WatingOrdersPage from "./WatingOrdersPage";

function OwnerOrdersPage() {
  const location = useLocation();
  const { restaurantId }: { restaurantId?: string } = qs.parse(location.search);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, status] = location.pathname.split("/orders/");
  if (!restaurantId) return null;
  return (
    <div>
      <OrdersNav restaurantId={restaurantId} status={status} />
      <Switch>
        <Route path={`/orders/wating`} component={WatingOrdersPage} exact />
        <Route path={`/orders/working`}>
          <div className="">진행중</div>
        </Route>
        <Route path={`/orders/done`}>
          <div className="">완료</div>
        </Route>
      </Switch>
    </div>
  );
}

export default OwnerOrdersPage;
