import { useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import DishGrid from "../../components/dish/DishGrid";
import { RESTAURANT_QUERY } from "../../lib/graphql/restaurant/query";
import {
  restaurantQuery,
  restaurantQueryVariables,
} from "../../__generated__/restaurantQuery";

interface IRestaurantParams {
  id: string;
}

function RestaurantPage() {
  const { id } = useParams<IRestaurantParams>();
  const { data } = useQuery<restaurantQuery, restaurantQueryVariables>(
    RESTAURANT_QUERY,
    {
      variables: { input: { restaurantId: +id } },
    }
  );

  return (
    <div>
      <section
        className="banner flex justify-center relative"
        style={{
          backgroundImage: `url(${data?.restaurant.result?.coverImg})`,
        }}
      >
        <div className="base-wrap-w absolute top-2/3 text-white">
          <h2 className="text-3xl font-bold sm:mb-2">
            {data?.restaurant.result?.name}
          </h2>
          <h4 className="text-sm font-semibold">
            Delivery Fee is $0.49 • 40–50 Min
          </h4>
        </div>
      </section>
      <div className="base-wrap-w py-5 text-gray-600">
        <div className="mb-2">
          <Link to={`/category/${data?.restaurant.result?.category?.slug}`}>
            <span className="text-sm font-normal hover:text-gray-800 hover:underline">
              {data?.restaurant.result?.category?.slug}
            </span>
          </Link>
        </div>

        <div className="text-sm">{data?.restaurant.result?.address}</div>
      </div>
      <div className="w-full bg-gray-200 pt-0.5"></div>

      <DishGrid
        dishes={data?.restaurant.result?.menu || []}
        restaurantId={+id}
      />
    </div>
  );
}

export default RestaurantPage;
