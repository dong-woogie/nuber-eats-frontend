import React, { useRef } from "react";
import foodImg from "../../images/food.png";
import marketingImg from "../../images/marketing.png";
import Category from "../../components/Category";
import Restaurant from "../../components/Restaurant";
import { useRestaurantsQuery } from "../../hooks/useRestaurantsPage";
import { gql } from "@apollo/client";

const RESTAURANTS_QUERY = gql`
  query restaurantsQuery($input: RestaurantsInput!) {
    restaurants(input: $input) {
      ok
      error
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
  const page = useRef(1);
  const { data, fetchMore } = useRestaurantsQuery({ page: 1 });

  const onClickMoreView = async () => {
    if (!data?.restaurants.totalPages) return;
    if (page.current >= data?.restaurants.totalPages) return;
    page.current += 1;
    await fetchMore({
      query: RESTAURANTS_QUERY,
      variables: {
        input: { page: page.current },
      },
      updateQuery(preResult, { fetchMoreResult }) {
        const results = [
          ...(preResult.restaurants.results || []),
          ...(fetchMoreResult?.restaurants.results || []),
        ];
        return {
          ...preResult,
          restaurants: {
            ...preResult.restaurants,
            results,
          },
        };
      },
    });
  };

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

      <section className="base-wrap-w my-10 grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-10">
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

      {page.current < (data?.restaurants.totalPages || 0) && (
        <div className="base-wrap base-wrap-w mb-10">
          <button
            className="focus:outline-none bg-black text-white p-3"
            onClick={onClickMoreView}
          >
            MORE VIEW
          </button>
        </div>
      )}
    </div>
  );
}

export default Restaurants;
