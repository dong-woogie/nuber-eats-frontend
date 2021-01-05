import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import { useMe } from "../hooks/useMe";
import Restaurants from "../pages/client/Restaurants";
import NotFound from "../pages/NotFound";
import ConfirmEmail from "../pages/user/ConfirmEmail";
import EditProfile from "../pages/user/EditProfile";
import { UserRole } from "../__generated__/globalTypes";

const ClientRoutes = [
  <Route path="/" component={Restaurants} exact key={1} />,
  <Route path="/confirm" component={ConfirmEmail} key={2} />,
  <Route path="/edit-profile" component={EditProfile} key={3} />,
  <Route component={NotFound} key={4} />,
];

function LoggedInRoute() {
  const { data, loading, error } = useMe();

  return (
    <div className="h-screen flex flex-col">
      <Header />
      {(loading || error) && (
        <div className="flex-1 flex items-center justify-center mb-52">
          <span className="font-medium text-3xl tracking-wider">
            Loading...
          </span>
        </div>
      )}
      <Switch>
        {data?.me.role === UserRole.Client && ClientRoutes}
        <Route path="/confirm" component={ConfirmEmail} />
      </Switch>
    </div>
  );
}

export default LoggedInRoute;
