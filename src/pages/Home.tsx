import React from "react";
import { useReactiveVar } from "@apollo/client";
import { loggedVars } from "../apollo";
import Login from "./Login";
import { Helmet } from "react-helmet";

function Home() {
  const isLoggedIn = useReactiveVar(loggedVars);
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Helmet>
            <title>Home | Number Eats</title>
          </Helmet>
          로그인
          <div>
            <button
              onClick={() => {
                loggedVars(false);
              }}
            >
              로그아웃버튼
            </button>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Home;
