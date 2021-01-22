import { useQuery } from "@apollo/client";
import React from "react";
import {
  myRestaurantQuery,
  myRestaurantQueryVariables,
} from "../../__generated__/myRestaurantQuery";
import { MY_RESTAURANT_QUERY } from "../../lib/graphql/restaurant";
import { useParams } from "react-router-dom";
import DishGrid from "../../components/DishGrid";
import {
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel,
} from "victory";

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
      <DishGrid
        dishes={data?.myRestaurant.restaurant?.menu || []}
        restaurantId={+restaurantId}
      />
      <section className="base-wrap-w pb-32">
        <VictoryChart
          width={window.innerWidth}
          height={500}
          domainPadding={50}
          containerComponent={<VictoryVoronoiContainer />}
          theme={VictoryTheme.material}
        >
          <VictoryLine
            data={data?.myRestaurant.restaurant?.orders.map((order) => ({
              x: order.createdAt,
              y: order.total,
            }))}
            labels={({ datum }) => datum.y}
            labelComponent={
              <VictoryTooltip
                renderInPortal
                dy={-20}
                style={{ fontSize: 18 }}
              />
            }
            interpolation="basis"
          />
          <VictoryAxis
            tickLabelComponent={<VictoryLabel renderInPortal />}
            tickFormat={(tick) => new Date(tick).toLocaleDateString("ko")}
          />
        </VictoryChart>
      </section>
    </div>
  );
}

export default MyRestaurant;
