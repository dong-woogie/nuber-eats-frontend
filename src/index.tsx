import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import { client } from "./apollo";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/styles.css";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

reportWebVitals();
