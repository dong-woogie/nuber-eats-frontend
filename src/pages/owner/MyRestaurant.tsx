import { useQuery } from "@apollo/client";
import React from "react";
import {
  myRestaurantQuery,
  myRestaurantQueryVariables,
} from "../../__generated__/myRestaurantQuery";
import { MY_RESTAURANT_QUERY } from "../../lib/graphql/restaurant";
import { useParams } from "react-router-dom";
import DishGrid from "../../components/DishGrid";

interface IParams {
  id: string;
}

function MyRestaurant() {
  const { id: restaurantId } = useParams<IParams>();
  const { data } = useQuery<myRestaurantQuery, myRestaurantQueryVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: { input: { restaurantId: +restaurantId } },
    }
  );

  return (
    <div className="flex-1">
      <section
        className="banner"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})`,
        }}
      ></section>
      <DishGrid dishes={data?.myRestaurant.restaurant?.menu || []} />
    </div>
  );
}

export default MyRestaurant;
