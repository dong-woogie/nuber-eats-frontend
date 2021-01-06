import { gql, useQuery } from "@apollo/client";
import React from "react";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";
import foodImg from "../../images/food.png";
import marketingImg from "../../images/marketing.png";
import Category from "../../components/Category";
import Restaurant from "../../components/Restaurant";

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
        <div className="sm:w-2/3 w-full box-border flex justify-center lg:gap-10">
          <img src={foodImg} alt="food" className="w-full h-full sm:max-w-md" />
          <img
            src={marketingImg}
            alt="food"
            className="hidden xl:block w-full h-full max-w-md"
          />
        </div>
      </section>
      <section className="base-wrap-w mt-8">
        <div className="flex justify-around max-w-md m-auto">
          {data?.allCategoies.categories?.map((category) => (
            <Category
              id={category.id + ""}
              name={category.name}
              coverImg={category.coverImg}
              key={category.id}
            />
          ))}
        </div>
        <hr className="mt-8" />
      </section>

      <section className="base-wrap-w mt-10 grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-10">
        {data?.restaurants.results?.map((restaurant) => (
          <Restaurant
            id={restaurant.id + ""}
            coverImg={restaurant.coverImg}
            name={restaurant.name}
            categoryName={restaurant.category?.name}
            key={restaurant.id}
          />
        ))}
      </section>
    </div>
  );
}

export default Restaurants;
