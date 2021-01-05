import { gql, useQuery } from "@apollo/client";
import React from "react";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";
import foodImg from "../../images/food.png";
import marketingImg from "../../images/marketing.png";

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategoies {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        address
        coverImg
        category {
          name
          slug
        }
        isPromoted
      }
    }
  }
`;

function Restaurants() {
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: { page: 1 },
    },
  });
  console.log(data);
  if (loading) return null;
  return (
    <div className="flex-1">
      <section className="bg-gray-800 w-full flex items-center sm:p-3 md:px-16 md:py-6 sm:max-h-80">
        <div className="hidden sm:w-1/3 text-white sm:flex sm:flex-col sm:justify-center sm:h-full">
          <h1 className="font-medium text-5xl mb-3">Crave it? Get it.</h1>
          <h4 className="font-light text-lg">
            Search for a favorite restaurant, cuisine, or dish.
          </h4>
        </div>
        <div className="sm:w-2/3 w-full box-border flex justify-center lg:justify-end lg:gap-10">
          <img src={foodImg} alt="food" className="w-full h-full lg:max-w-lg" />
          <img
            src={marketingImg}
            alt="food"
            className="hidden xl:block w-full h-full max-w-lg"
          />
        </div>
      </section>
      <section className="max-w-screen-xl w-full m-auto mt-8 px-8 xl:px-0">
        <div className="flex justify-around">
          {data?.allCategoies.categories?.map((category) => (
            <div
              className="flex flex-col justify-center items-center cursor-pointer"
              key={category.id + category.name}
            >
              <div className="w-10 h-10 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full box-content p-1.5">
                <img
                  className="w-full h-full"
                  src={category.coverImg || ""}
                  alt="cover"
                />
              </div>
              <div className="mt-3">
                <span className="font-medium text-sm">{category.name}</span>
              </div>
            </div>
          ))}
        </div>
        <hr className="mt-8"></hr>
      </section>
    </div>
  );
}

export default Restaurants;
