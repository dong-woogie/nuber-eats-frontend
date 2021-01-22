import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { LOCAL_STORAGE_TOKEN } from "./constants";
import { setContext } from "@apollo/client/link/context";
import { DishParts } from "./__generated__/DishParts";
import { CreateOrderItemInput } from "./__generated__/globalTypes";

export interface IBasket extends CreateOrderItemInput {
  name: string;
  price: number;
  total: number;
  count: number;
}

export interface IBasketVars {
  restaurantId?: number;
  items?: IBasket[];
}

export interface ISelectDish extends DishParts {
  restaurantId: number;
}

export interface IAddBasketAlert {
  onSubmit: () => void;
}

const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
export const loggedVars = makeVar(Boolean(token));
export const authTokenVars = makeVar(token);
export const createRestaurantDialogVars = makeVar(false);
export const createDishDialogVars = makeVar(false);
export const optionDialogVars = makeVar(false);
export const basketDialogVars = makeVar(false);

export const messageAlertVars = makeVar("");

export const selectDishFormVars = makeVar<ISelectDish | null>(null);
export const basketsVars = makeVar<IBasketVars | null>(null);
export const addBasketAlertVars = makeVar<IAddBasketAlert | null>(null);

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": authTokenVars() || "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {},
      },
    },
  }),
});
