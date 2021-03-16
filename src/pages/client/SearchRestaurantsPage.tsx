import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";
import { useSearchRestaurants } from "../../lib/hooks/useSearchRestaurants";
import RestaurantGrid from "../../components/restaurant/RestaurantGrid";

function SearchRestaurantsPage() {
  const location = useLocation();
  const history = useHistory();
  const { term }: { term?: string } = qs.parse(location.search);
  const { called, data, loading } = useSearchRestaurants(term || "");

  useEffect(() => {
    if (!term) return history.replace("/");
    called();
  }, [history, called, term]);

  return (
    <div className="flex-1">
      <RestaurantGrid
        restaurants={data?.searchRestaurants.restaurants || []}
        loading={loading}
      />
    </div>
  );
}

export default SearchRestaurantsPage;
