import React from "react";
import loadable from "@loadable/component";
import { Route, Switch } from "react-router-dom";
import Header from "../components/home/Header";
import { useMe } from "../lib/hooks/useMe";
import { UserRole } from "../__generated__/globalTypes";
import BasketFixedButton from "../components/common/fixed/BasketFixedButton";
import SelectDishDialog from "../components/dish/SelectDishDialog";
import {
  confirmDialogVars,
  basketDialogVars,
  messageAlertVars,
  selectDishFormVars,
  createAddressDialogVars,
  addressDialogVars,
  createDishDialogVars,
} from "../apollo";
import { useReactiveVar } from "@apollo/client";
import BasketDialog from "../components/basket/BasketDialog";
import MessageAlert from "../components/common/alert/MessageAlert";
import ConfirmDialog from "../components/common/alert/ConfirmDialog";
import CreateAddressDialog from "../components/common/dialog/CreateAddressDialog";
import Address from "../components/common/Address";
import AddressDialog from "../components/common/dialog/AddressDialog";

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
const OrderPage = loadable(() => import("../pages/client/OrderPage"));
const OrdersPage = loadable(() => import("../pages/client/OrdersPage"));
const OwnerOrderPage = loadable(() => import("../pages/owner/OwnerOrderPage"));
const OwnerOrdersPage = loadable(
  () => import("../pages/owner/orders/OwnerOrdersPage")
);
const CreateRestaurantDialog = loadable(
  () => import("../components/restaurant/CreateRestaurantDialog")
);
const CreateDishDialog = loadable(
  () => import("../components/dish/CreateDishDialog")
);
const CreateRestaurantFixedButton = loadable(
  () => import("../components/common/fixed/CreateRestaurantFixedButton")
);
const CreateDishFixedButton = loadable(
  () => import("../components/common/fixed/CreateDishFixedButton")
);
const Dashboard = loadable(() => import("../pages/driver/Dashboard"));

// Route컴포넌트와 Dialog컴포넌트는 route기준으로 코드스플리팅
const clientRoutes = [
  { path: "/", component: RestaurantsPage },
  { path: "/search", component: SearchRestaurantsPage },
  { path: "/category/:slug", component: CategoryPage },
  { path: "/restaurant/:id", component: RestaurantPage },
  { path: "/confirm", component: ConfirmEmailPage },
  { path: "/edit-profile", component: EditProfilePage },
  { path: "/order/:orderId", component: OrderPage },
  { path: "/orders", component: OrdersPage },
  { component: NotFoundPage },
];

const ownerRoutes = [
  { path: "/", component: MyRestaurantsPage },
  { path: "/confirm", component: ConfirmEmailPage },
  { path: "/edit-profile", component: EditProfilePage },
  { path: "/restaurant/:id", component: MyRestaurant },
  { path: "/order/:orderId", component: OwnerOrderPage },
  { path: "/orders", component: OwnerOrdersPage },
  { component: NotFoundPage },
];

const ownerFixedComponent = [
  {
    path: "/",
    components: [CreateRestaurantFixedButton, CreateRestaurantDialog],
  },
  {
    path: "/restaurant/:id",
    components: [CreateDishFixedButton, CreateDishDialog],
  },
];

const driverRoutes = [
  { path: "/", component: Dashboard },
  { component: NotFoundPage },
];

function LoggedInRoute() {
  const { data } = useMe();
  const isConfirmDialog = !!useReactiveVar(confirmDialogVars);
  const isSelectDishFormDialog = !!useReactiveVar(selectDishFormVars);
  const isBasketDialog = useReactiveVar(basketDialogVars);
  const isMessageAlert = !!useReactiveVar(messageAlertVars);
  const isCreateAddressDialog = useReactiveVar(createAddressDialogVars);
  const isAddressDialog = !!useReactiveVar(addressDialogVars);
  const isCreateDishDialog = useReactiveVar(createDishDialogVars);

  const isOverflowHidden = () => {
    if (
      isConfirmDialog ||
      isSelectDishFormDialog ||
      isBasketDialog ||
      isMessageAlert ||
      isCreateAddressDialog ||
      isAddressDialog ||
      isCreateDishDialog
    ) {
      return "overflow-hidden";
    }
    return "";
  };

  return (
    <>
      <div className={`min-h-screen flex flex-col ${isOverflowHidden()}`}>
        {data?.me.role === UserRole.Client && <Address />}
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
                  exact={route.path === ("/" || "/orders")}
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

          {data?.me.role === UserRole.Delivery &&
            driverRoutes.map((route) => {
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
      {data?.me.role === UserRole.Client && isSelectDishFormDialog && (
        <SelectDishDialog />
      )}
      {data?.me.role === UserRole.Client && isConfirmDialog && (
        <ConfirmDialog />
      )}
      {data?.me.role === UserRole.Client && isBasketDialog && <BasketDialog />}
      {data?.me.role === UserRole.Client && isMessageAlert && <MessageAlert />}
      <CreateAddressDialog />
      <AddressDialog />
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
