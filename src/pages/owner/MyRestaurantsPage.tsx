import React from "react";
import { useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { createRestaurantDialogVars } from "../../apollo";
import { MY_RESTAURANTS_QUERY } from "../../lib/graphql/restaurant";
import { myRestaurantsQuery } from "../../__generated__/myRestaurantsQuery";
import RestaurantGrid from "../../components/RestaurantGrid";

function MyRestaurantsPage() {
  const { data } = useQuery<myRestaurantsQuery>(MY_RESTAURANTS_QUERY);
  const onOpenDialog = () => createRestaurantDialogVars(true);
  return (
    <div className="flex-1">
      <Helmet>
        <title>Owner Home | Nuber Eats</title>
      </Helmet>
      {(data?.myRestaurants.restaurants?.length || 0) > 0 && (
        <RestaurantGrid restaurants={data?.myRestaurants.restaurants || []} />
      )}
      {data?.myRestaurants.restaurants?.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <div className="mb-wrap text-center">
            <h1 className="font-semibold text-7xl text-gray-800 mb-5">텅</h1>
            <h4 className="text-lg font-light">소유한 음식점이 없습니다.</h4>
            <div
              className=" mt-3 flex items-center justify-center cursor-pointer"
              onClick={onOpenDialog}
            >
              <span className="link">음식점 등록하기</span>
              <span className="text-3xl ml-1"> 🏃‍♀️ </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyRestaurantsPage;
