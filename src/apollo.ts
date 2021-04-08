import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { LOCAL_STORAGE_TOKEN } from "./constants";
import { setContext } from "@apollo/client/link/context";
import { DishParts } from "./__generated__/DishParts";
import { CreateOrderItemInput } from "./__generated__/globalTypes";
import { getMainDefinition } from "@apollo/client/utilities";

export interface IBasket extends CreateOrderItemInput {
  name: string;
  price: number;
  total: number;
  count: number;
  selectDishId: number;
}

export interface IBasketVars {
  restaurantId?: number;
  items?: IBasket[];
}

export interface ISelectDish extends DishParts {
  restaurantId: number;
}

interface IConfirmDialog {
  title?: string;
  subTitle?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
}

interface IAddressDialog {
  onComplete: (address: string) => void;
}

export interface IGlobalPosition {
  lat: number;
  lng: number;
}

export enum IStatus {
  wating = "wating",
  working = "working",
  done = "done",
}

interface IOrderStatusCount {
  [IStatus.wating]: number;
  [IStatus.working]: number;
  [IStatus.done]: number;
}

const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
export const loggedVars = makeVar(Boolean(token));
export const authTokenVars = makeVar(token);
export const createRestaurantDialogVars = makeVar(false);
export const createDishDialogVars = makeVar(false);
export const optionDialogVars = makeVar(false);
export const basketDialogVars = makeVar(false);
export const confirmDialogVars = makeVar<IConfirmDialog | null>(null);
export const createAddressDialogVars = makeVar<boolean>(false);
export const addressDialogVars = makeVar<IAddressDialog | null>(null);
export const messageAlertVars = makeVar("");

export const selectDishFormVars = makeVar<ISelectDish | null>(null);
export const basketsVars = makeVar<IBasketVars | null>(null);

export const globalPositionVars = makeVar<IGlobalPosition>({ lat: 0, lng: 0 });
export const orderStatusVars = makeVar<IStatus>(IStatus.wating);

export const orderStatusCountVars = makeVar<IOrderStatusCount>({
  wating: 0,
  working: 0,
  done: 0,
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      "x-jwt": authTokenVars() || "",
    },
  },
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": authTokenVars() || "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {},
      },
    },
  }),
});
