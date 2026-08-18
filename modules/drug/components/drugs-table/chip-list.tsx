'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { Tooltip } from '@mui/material';

import {
  ChipsCellWrapper,
  ChipsCell,
  MeasureRow,
  StyledChip,
  MoreChip,
} from './drugs-table-styles';

interface ChipListProps {
  items: string[];
}

const GAP = 4;

export const ChipList = ({ items }: ChipListProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(items.length);
  const [firstChipMaxWidth, setFirstChipMaxWidth] = useState<number | null>(
    null,
  );

  useLayoutEffect(() => {
    const calculateVisibleCount = () => {
      const wrapper = wrapperRef.current;
      const measure = measureRef.current;

      if (!wrapper || !measure) {
        return;
      }

      const availableWidth = wrapper.offsetWidth;
      const chipEls = Array.from(measure.children) as HTMLElement[];
      const ellipsisEl = chipEls[chipEls.length - 1];
      const ellipsisWidth = ellipsisEl?.offsetWidth ?? 0;

      let usedWidth = 0;
      let count = 0;

      for (let i = 0; i < items.length; i += 1) {
        const chipWidth = chipEls[i].offsetWidth;
        const isLast = i === items.length - 1;
        const reservedWidth = isLast ? 0 : ellipsisWidth + GAP;
        const nextWidth = usedWidth + chipWidth + (count > 0 ? GAP : 0);

        if (nextWidth + reservedWidth > availableWidth) {
          break;
        }

        usedWidth = nextWidth;
        count += 1;
      }

      // Always keep the first chip visible, shrinking it to fit if necessary
      if (count === 0 && items.length > 0) {
        const hasHidden = items.length > 1;
        const reserved = hasHidden ? ellipsisWidth + GAP : 0;

        count = 1;
        setFirstChipMaxWidth(Math.max(availableWidth - reserved, 24));
      } else {
        setFirstChipMaxWidth(null);
      }

      setVisibleCount(count);
    };

    calculateVisibleCount();

    const wrapper = wrapperRef.current;

    if (!wrapper) {
      return;
    }

    const observer = new ResizeObserver(calculateVisibleCount);
    observer.observe(wrapper);

    return () => observer.disconnect();
  }, [items]);

  const hiddenCount = items.length - visibleCount;
  const visibleItems = items.slice(0, visibleCount);

  return (
    <ChipsCellWrapper ref={wrapperRef}>
      <ChipsCell>
        {visibleItems.map((item, index) => {
          const isTruncated = index === 0 && firstChipMaxWidth !== null;
          const chip = (
            <StyledChip
              key={item}
              label={item}
              size='small'
              variant='outlined'
              sx={isTruncated ? { maxWidth: firstChipMaxWidth } : undefined}
            />
          );

          return isTruncated ? (
            <Tooltip key={item} title={item}>
              {chip}
            </Tooltip>
          ) : (
            chip
          );
        })}

        {hiddenCount > 0 && (
          <Tooltip title={items.join(', ')}>
            <MoreChip label='...' size='small' variant='outlined' />
          </Tooltip>
        )}
      </ChipsCell>

      {/* Off-screen row used only to measure natural chip widths */}
      <MeasureRow ref={measureRef}>
        {items.map((item) => (
          <StyledChip key={item} label={item} size='small' variant='outlined' />
        ))}
        <MoreChip label='...' size='small' variant='outlined' />
      </MeasureRow>
    </ChipsCellWrapper>
  );
};
