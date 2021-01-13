import { useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MY_RESTAURANTS_QUERY } from "../../lib/graphql/restaurant";
import { myRestaurantsQuery } from "../../__generated__/myRestaurantsQuery";

function MyRestaurantsPage() {
  const { data } = useQuery<myRestaurantsQuery>(MY_RESTAURANTS_QUERY);
  console.log(data);
  return (
    <div className="base-wrap">
      <Helmet>
        <title>Owner Home | Nuber Eats</title>
      </Helmet>
      {data?.myRestaurants.restaurants?.length === 0 && (
        <div className="mb-wrap text-center">
          <h1 className="font-semibold text-7xl text-gray-800 mb-5">텅</h1>
          <h4 className="font-medium text-lg">소유한 음식점이 없습니다.</h4>
          <Link to="/create-restaurant">
            <h5 className=" mt-3 flex items-center justify-center">
              <span className="link">음식점 등록하러 가기</span>
              <span className="text-3xl ml-1"> 🏃‍♀️ </span>
            </h5>
          </Link>
        </div>
      )}
    </div>
  );
}

export default MyRestaurantsPage;
