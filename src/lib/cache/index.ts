interface ICacheRestaurantQuery {
  id: number;
  name: string;
  categoryName: string;
  address: string;
  coverImg: string;
}

export function cacheDishQuqey(cacheQuery: any, queryData: any) {
  return {
    ...cacheQuery,
    myRestaurant: {
      ...cacheQuery.myRestaurant,
      restaurant: {
        ...cacheQuery.myRestaurant.restaurant,
        menu: [queryData, ...cacheQuery.myRestaurant.restaurant.menu],
      },
    },
  };
}

export function cacheMyRestaurantQuery(
  cacheQuery: any,
  queryData: ICacheRestaurantQuery
) {
  return {
    myRestaurants: {
      ...cacheQuery.myRestaurants,
      restaurants: [
        cacheRestaurantQuery(queryData),
        ...cacheQuery.myRestaurants.restaurants,
      ],
    },
  };
}

const cacheRestaurantQuery = ({
  id,
  address,
  name,
  coverImg,
  categoryName,
}: ICacheRestaurantQuery) => {
  return {
    id,
    address,
    name,
    coverImg: coverImg,
    category: {
      name: categoryName,
      slug: categoryName,
      __typename: "Category",
    },
    isPromoted: false,
    __typename: "Restaurant",
  };
};
