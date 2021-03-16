import { useCallback, useEffect } from "react";

const isScrollBottom = () => {
  if (!document.body) return false;
  return (
    window.scrollY + document.documentElement.clientHeight ===
    document.documentElement.scrollHeight
  );
};

export const useScrollPagination = ({
  onLoadMore,
  skip,
  hasMore,
}: {
  onLoadMore: (skip: number) => any;
  skip: number;
  hasMore: boolean;
}) => {
  const onScroll = useCallback(() => {
    if (!isScrollBottom() || !hasMore) return;
    onLoadMore(skip);
  }, [onLoadMore, skip, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);
};
