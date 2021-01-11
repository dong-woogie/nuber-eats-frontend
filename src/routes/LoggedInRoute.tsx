import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../components/Header";
import Loading from "../components/Loading";
import { useMe } from "../lib/hooks/useMe";
import Category from "../pages/client/Category";
import RestaurantPage from "../pages/client/RestaurantPage";
import Restaurants from "../pages/client/Restaurants";
import Search from "../pages/client/Search";
import NotFound from "../pages/NotFound";
import ConfirmEmail from "../pages/user/ConfirmEmail";
import EditProfile from "../pages/user/EditProfile";
import { UserRole } from "../__generated__/globalTypes";

const ClientRoutes = [
  <Route path="/" component={Restaurants} exact key={1} />,
  <Route path="/confirm" component={ConfirmEmail} key={2} />,
  <Route path="/edit-profile" component={EditProfile} key={3} />,
  <Route path="/search" component={Search} key={4} />,
  <Route path="/category/:slug" component={Category} key={5} />,
  <Route path="/restaurants/:id" component={RestaurantPage} key={6} />,
  <Route component={NotFound} key={7} />,
];

function LoggedInRoute() {
  const { data, loading } = useMe();

  return (
    <div className="h-screen flex flex-col">
      <Header />
      {loading && <Loading />}
      <Switch>
        {data?.me.role === UserRole.Client && ClientRoutes}
        <Route path="/confirm" component={ConfirmEmail} />
      </Switch>
    </div>
  );
}

export default LoggedInRoute;
