import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateAccount from "./pages/CreateAccount";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/create-account" component={CreateAccount} />
    </Switch>
  );
}

export default App;
