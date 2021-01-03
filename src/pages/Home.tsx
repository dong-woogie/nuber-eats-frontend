import React from "react";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { loggedVars } from "../apollo";
import Login from "./Login";
import { Helmet } from "react-helmet";
import { MeQuery } from "../__generated__/MeQuery";

const ME_QUERY = gql`
  query MeQuery {
    me {
      email
      role
    }
  }
`;

function Home() {
  const isLoggedIn = useReactiveVar(loggedVars);
  const { data, loading, error } = useQuery<MeQuery>(ME_QUERY);

  if (!isLoggedIn) return <Login />;
  if (loading || error || !data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="font-medium text-3xl tracking-wider">Loading...</span>
      </div>
    );
  }
  return (
    <div>
      <div>
        <Helmet>
          <title>Home | Number Eats</title>
        </Helmet>
        <p>email : {data?.me.email}</p>
        <p>role : {data?.me.role}</p>
      </div>
    </div>
  );
}

export default Home;
