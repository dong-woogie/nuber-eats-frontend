import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateAccount from "../pages/CreateAccount";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

function LoggedOutRoute() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/create-account" component={CreateAccount} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default LoggedOutRoute;
