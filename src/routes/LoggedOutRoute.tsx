import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateAccountPage from "../pages/CreateAccountPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";

function LoggedOutRoute() {
  return (
    <Switch>
      <Route path="/" component={LoginPage} exact />
      <Route path="/login" component={LoginPage} />
      <Route path="/create-account" component={CreateAccountPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default LoggedOutRoute;
