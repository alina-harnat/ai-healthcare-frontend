'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import { Search, SearchX, Sparkles } from 'lucide-react';

import { DRUG_LOCALE } from '../../constants';
import type { SimilarDrugImage } from '../../types';
import { ResultCard, ResultCardSkeleton } from './result-card';

interface ResultsPanelProps {
  results: SimilarDrugImage[] | null;
  latencyMs: number | null;
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  onUseAsQuery: (imageUrl: string) => void;
  onViewRecord: () => void;
}

const SKELETON_COUNT = 4;

const GRID_SX = {
  display: 'grid',
  gap: 2,
  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
} as const;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const SEARCH_STEP_MS = 1400;

function SearchProgressText() {
  const t = useTranslations(DRUG_LOCALE);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setStep(1), SEARCH_STEP_MS);

    return () => window.clearInterval(id);
  }, []);

  return (
    <Box
      component='span'
      key={step}
      sx={{ display: 'inline-block', animation: `${fadeIn} 300ms ease-out` }}
    >
      {step === 0
        ? t('imageSearch.analyzingRegion')
        : t('imageSearch.searchingRecords')}
    </Box>
  );
}

const EMPTY_STATE_SX = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1.5,
  minHeight: 320,
  px: 3,
  textAlign: 'center',
  borderRadius: 1,
  border: '1px dashed',
  borderColor: 'divider',
  color: 'text.secondary',
} as const;

export function ResultsPanel({
  results,
  latencyMs,
  hasMore,
  loading,
  onLoadMore,
  onUseAsQuery,
  onViewRecord,
}: ResultsPanelProps) {
  const t = useTranslations(DRUG_LOCALE);

  const sorted = useMemo(
    () =>
      results
        ? [...results].sort((a, b) => b.similarityScore - a.similarityScore)
        : null,
    [results],
  );

  const isInitialLoad = loading && !sorted?.length;
  const hasResults = !!sorted?.length;

  const status =
    hasResults && !loading
      ? [
          t('imageSearch.matchingRecords', { count: sorted.length }),
          latencyMs !== null
            ? t('imageSearch.searchTime', {
                seconds: (latencyMs / 1000).toFixed(2),
              })
            : null,
        ]
          .filter(Boolean)
          .join(' · ')
      : '';

  return (
    <Box
      component='section'
      sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, minWidth: 0 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Typography variant='h6' component='h2'>
          {t('imageSearch.resultsTitle')}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          role='status'
          aria-live='polite'
        >
          {loading ? <SearchProgressText /> : status}
        </Typography>
      </Box>

      {isInitialLoad && (
        <Box aria-hidden sx={GRID_SX}>
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <ResultCardSkeleton key={index} />
          ))}
        </Box>
      )}

      {!isInitialLoad && sorted === null && (
        <Box sx={EMPTY_STATE_SX}>
          <Sparkles size={24} aria-hidden />
          <Typography variant='body2'>
            {t('imageSearch.noResultsYet')}
          </Typography>
        </Box>
      )}

      {!isInitialLoad && sorted !== null && !hasResults && (
        <Box sx={EMPTY_STATE_SX}>
          <SearchX size={24} aria-hidden />
          <Typography variant='subtitle1' color='text.primary'>
            {t('imageSearch.emptyTitle')}
          </Typography>
          <Typography variant='body2'>
            {t('imageSearch.emptyDescription')}
          </Typography>
        </Box>
      )}

      {hasResults && (
        <Box sx={GRID_SX}>
          {sorted.map((result, index) => (
            <Box
              key={result.id}
              sx={{
                height: '100%',
                animation: `${fadeUp} 360ms ease-out both`,
                animationDelay: `${Math.min(index, 11) * 40}ms`,
                '@media (prefers-reduced-motion: reduce)': {
                  animation: 'none',
                },
              }}
            >
              <ResultCard
                result={result}
                onUseAsQuery={onUseAsQuery}
                onViewRecord={onViewRecord}
              />
            </Box>
          ))}
        </Box>
      )}

      {hasMore && (
        <Button
          variant='outlined'
          onClick={onLoadMore}
          disabled={loading}
          sx={{ alignSelf: 'center' }}
          startIcon={
            loading ? (
              <CircularProgress size={16} color='inherit' />
            ) : (
              <Search size={16} aria-hidden />
            )
          }
        >
          {loading ? t('imageSearch.searching') : t('imageSearch.loadMore')}
        </Button>
      )}

      {hasResults && (
        <Typography
          variant='caption'
          color='text.secondary'
          sx={{ textAlign: 'center' }}
        >
          {t('imageSearch.disclaimer')}
        </Typography>
      )}
    </Box>
  );
}
