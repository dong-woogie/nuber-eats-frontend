import { gql, useQuery } from "@apollo/client";
import React from "react";
import {
  myRestaurantQuery,
  myRestaurantQueryVariables,
} from "../../__generated__/myRestaurantQuery";
import { MY_RESTAURANT_QUERY } from "../../lib/graphql/restaurant";
import { useParams } from "react-router-dom";

interface IParams {
  id: string;
}

function MyRestaurant() {
  const { id: restaurantId } = useParams<IParams>();
  const { data } = useQuery<myRestaurantQuery, myRestaurantQueryVariables>(
    MY_RESTAURANT_QUERY,
    { variables: { input: { restaurantId: +restaurantId } } }
  );

  console.log(data);
  return (
    <div>
      <h1>MY RESTAURANT</h1>
    </div>
  );
}

export default MyRestaurant;
