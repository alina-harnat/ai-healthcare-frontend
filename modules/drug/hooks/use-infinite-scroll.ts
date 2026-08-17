import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (
  hasMore: boolean,
  dependencyLength: number,
  onLoadMore?: () => void,
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    if (!hasMore || !onLoadMore) {
      return;
    }

    const container = containerRef.current;
    const sentinel = sentinelRef.current;

    if (!container || !sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      { root: container },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasMore, onLoadMore, dependencyLength]);

  return { containerRef, sentinelRef };
};
