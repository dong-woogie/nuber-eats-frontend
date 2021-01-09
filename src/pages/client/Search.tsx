import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";
import MoreViewBtn from "../../components/MoreViewBtn";
import { useSearchRestaurants } from "../../lib/hooks/useSearchRestaurants";
import RestaurantGrid from "../../components/RestaurantGrid";

function Search() {
  const location = useLocation();
  const history = useHistory();
  const { term }: { term?: string } = qs.parse(location.search);
  const { called, data, loading, page, onLoadMore } = useSearchRestaurants(
    term || ""
  );

  const onClickMoreView = () => {
    onLoadMore(page);
  };

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
      {page <= (data?.searchRestaurants.totalPages || 0) && (
        <MoreViewBtn onClick={onClickMoreView} />
      )}
    </div>
  );
}

export default Search;
