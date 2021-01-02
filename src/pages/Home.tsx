import React from "react";
import { useReactiveVar } from "@apollo/client";
import { loggedVars } from "../apollo";

function Home() {
  const isLoggedIn = useReactiveVar(loggedVars);
  return <div>{isLoggedIn ? "로그인" : "로그아웃"}</div>;
}

export default Home;
