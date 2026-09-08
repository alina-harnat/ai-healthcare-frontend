import { useEffect, useMemo, useState } from 'react';
import { debounce } from '@mui/material/utils';

export const useDebouncedValue = <T>(value: T, delayMs: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const debouncedSetter = useMemo(
    () => debounce((next: T) => setDebouncedValue(next), delayMs),
    [delayMs],
  );

  useEffect(() => {
    debouncedSetter(value);

    return () => debouncedSetter.clear();
  }, [value, debouncedSetter]);

  return debouncedValue;
};
