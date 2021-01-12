import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../components/Header";
import { useMe } from "../lib/hooks/useMe";
import CategoryPage from "../pages/client/CategoryPage";
import RestaurantPage from "../pages/client/RestaurantPage";
import RestaurantsPage from "../pages/client/RestaurantsPage";
import SearchRestaurantsPage from "../pages/client/SearchRestaurantsPage";
import NotFoundPage from "../pages/NotFoundPage";
import MyRestaurantsPage from "../pages/owner/MyRestaurantsPage";
import ConfirmEmailPage from "../pages/user/ConfirmEmailPage";
import EditProfilePage from "../pages/user/EditProfilePage";
import { UserRole } from "../__generated__/globalTypes";

const clientRoutes = [
  { path: "/", component: RestaurantsPage },
  { path: "/search", component: SearchRestaurantsPage },
  { path: "/category/:slug", component: CategoryPage },
  { path: "/restaurants/:id", component: RestaurantPage },
  { path: "/confirm", component: ConfirmEmailPage },
  { path: "/edit-profile", component: EditProfilePage },
  { component: NotFoundPage },
];

const ownerRoutes = [
  { path: "/", component: MyRestaurantsPage },
  { path: "/confirm", component: ConfirmEmailPage },
  { path: "/edit-profile", component: EditProfilePage },
  { component: NotFoundPage },
];

function LoggedInRoute() {
  const { data } = useMe();

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <Switch>
        {data?.me.role === UserRole.Client &&
          clientRoutes.map((route) => {
            if (!route.path) {
              return <Route key="Not Found" component={NotFoundPage} />;
            }
            return (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
                exact={route.path === "/"}
              />
            );
          })}

        {data?.me.role === UserRole.Owner &&
          ownerRoutes.map((route) => {
            if (!route.path) {
              return <Route key="Not Found" component={NotFoundPage} />;
            }
            return (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
                exact={route.path === "/"}
              />
            );
          })}
      </Switch>
    </div>
  );
}

export default LoggedInRoute;
