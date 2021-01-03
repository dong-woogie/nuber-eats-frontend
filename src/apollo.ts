import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  ApolloLink,
  concat,
} from "@apollo/client";
import { LOCAL_STORAGE_TOKEN } from "./constants";

const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
export const loggedVars = makeVar(Boolean(token));
export const authTokenVars = makeVar(token);

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      "x-jwt": authTokenVars(),
    },
  });
  return forward(operation);
});

export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return loggedVars();
            },
          },
          token: {
            read() {
              return authTokenVars();
            },
          },
        },
      },
    },
  }),
});
