import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { LOCAL_STORAGE_TOKEN } from "./constants";

const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
export const loggedVars = makeVar(Boolean(token));
export const authTokenVars = makeVar(token);

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
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
