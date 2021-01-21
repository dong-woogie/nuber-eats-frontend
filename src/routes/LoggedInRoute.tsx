import React from "react";
import loadable from "@loadable/component";
import { Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import { useMe } from "../lib/hooks/useMe";
import { UserRole } from "../__generated__/globalTypes";
import BasketFixedButton from "../components/common/fixed/BasketFixedButton";
import SelectDishDialog from "../components/common/dialog/SelectDishDialog";
import AddBasketAlert from "../components/common/alert/AddBasketAlert";
import { addBasketAlertVars, selectDishFormVars } from "../apollo";
import { useReactiveVar } from "@apollo/client";

const CategoryPage = loadable(() => import("../pages/client/CategoryPage"));
const RestaurantPage = loadable(() => import("../pages/client/RestaurantPage"));
const RestaurantsPage = loadable(
  () => import("../pages/client/RestaurantsPage")
);
const SearchRestaurantsPage = loadable(
  () => import("../pages/client/SearchRestaurantsPage")
);
const NotFoundPage = loadable(() => import("../pages/NotFoundPage"));
const MyRestaurant = loadable(() => import("../pages/owner/MyRestaurant"));
const MyRestaurantsPage = loadable(
  () => import("../pages/owner/MyRestaurantsPage")
);
const ConfirmEmailPage = loadable(
  () => import("../pages/user/ConfirmEmailPage")
);
const EditProfilePage = loadable(() => import("../pages/user/EditProfilePage"));

const CreateRestaurantDialog = loadable(
  () => import("../components/common/dialog/CreateRestaurantDialog")
);
const CreateDishDialog = loadable(
  () => import("../components/common/dialog/CreateDishDialog")
);
const CreateRestaurantFixedButton = loadable(
  () => import("../components/common/fixed/CreateRestaurantFixedButton")
);
const CreateDishFixedButton = loadable(
  () => import("../components/common/fixed/CreateDishFixedButton")
);

// Route컴포넌트와 Dialog컴포넌트는 route기준으로 코드스플리팅
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
  { path: "/restaurants/:id", component: MyRestaurant },
  { component: NotFoundPage },
];

const ownerFixedComponent = [
  {
    path: "/",
    components: [CreateRestaurantFixedButton, CreateRestaurantDialog],
  },
  {
    path: "/restaurants/:id",
    components: [CreateDishFixedButton, CreateDishDialog],
  },
];

function LoggedInRoute() {
  const { data } = useMe();
  const isAddBasketAlert = !!useReactiveVar(addBasketAlertVars);
  const isSelectDishForm = !!useReactiveVar(selectDishFormVars);
  const isOverflowHidden = () =>
    isAddBasketAlert || isSelectDishForm ? "overflow-hidden" : "";
  return (
    <>
      <div className={`h-screen flex flex-col ${isOverflowHidden()}`}>
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
      {data?.me.role === UserRole.Client && <BasketFixedButton />}
      {data?.me.role === UserRole.Client && isSelectDishForm && (
        <SelectDishDialog />
      )}
      {data?.me.role === UserRole.Client && isAddBasketAlert && (
        <AddBasketAlert />
      )}
      {data?.me.role === UserRole.Owner && (
        <Switch>
          {ownerFixedComponent.map(({ path, components }, index) => (
            <Route path={path} key={path} exact>
              {components.map((Component, index) => (
                <Component key={index} />
              ))}
            </Route>
          ))}
        </Switch>
      )}
    </>
  );
}

export default LoggedInRoute;
