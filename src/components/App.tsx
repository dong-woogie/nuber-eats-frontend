import { useReactiveVar } from "@apollo/client";
import React from "react";
import { loggedVars } from "../apollo";
import LoggedInRoute from "../routes/LoggedInRoute";
import LoggedOutRoute from "../routes/LoggedOutRoute";

function App() {
  const isLogged = useReactiveVar(loggedVars);
  if (isLogged) return <LoggedInRoute />;
  return <LoggedOutRoute />;
}

export default App;
