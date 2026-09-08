import { useEffect, useState } from 'react';

interface UseTablePageSizeOptions {
  rowHeight: number;
  headerHeight?: number;
  reservedHeight?: number;
  minRows?: number;
  maxRows?: number;
}

const calculatePageSize = ({
  rowHeight,
  headerHeight = 0,
  reservedHeight = 0,
  minRows = 5,
  maxRows = 50,
}: UseTablePageSizeOptions) => {
  if (typeof window === 'undefined') {
    return minRows;
  }

  const availableHeight = window.innerHeight - headerHeight - reservedHeight;
  const rows = Math.floor(availableHeight / rowHeight);

  return Math.min(Math.max(rows, minRows), maxRows);
};

export const useTablePageSize = (options: UseTablePageSizeOptions) => {
  const { rowHeight, headerHeight, reservedHeight, minRows, maxRows } = options;

  const [pageSize, setPageSize] = useState(() => calculatePageSize(options));

  useEffect(() => {
    const handleResize = () => {
      setPageSize(
        calculatePageSize({
          rowHeight,
          headerHeight,
          reservedHeight,
          minRows,
          maxRows,
        }),
      );
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [rowHeight, headerHeight, reservedHeight, minRows, maxRows]);

  return pageSize;
};
