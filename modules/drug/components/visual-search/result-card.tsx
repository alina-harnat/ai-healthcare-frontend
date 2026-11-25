'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ExternalLink, ImageOff, ScanSearch } from 'lucide-react';

import { DRUG_LOCALE } from '../../constants';
import type { SimilarDrugImage } from '../../types';

export const CARD_ASPECT = '4 / 3';

const ACTION_HEIGHT = 36;

const CARD_BASE_SX = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderRadius: 1,
  overflow: 'hidden',
} as const;

const MEDIA_FRAME_SX = {
  position: 'relative',
  overflow: 'hidden',
  aspectRatio: CARD_ASPECT,
  bgcolor: 'action.hover',
} as const;

const BODY_SX = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0.5,
  flexGrow: 1,
  px: 2,
  pt: 1.5,
} as const;

const lineSx = (height: number) =>
  ({
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
    height,
  }) as const;

const FOOTER_SX = {
  display: 'flex',
  gap: 1,
  px: 2,
  pt: 1.5,
  pb: 2,
} as const;

interface ResultCardProps {
  result: SimilarDrugImage;
  onUseAsQuery: (imageUrl: string) => void;
  onViewRecord: () => void;
}

const toPercent = (score: number) => {
  const value = score <= 1 ? score * 100 : score;

  return Math.min(100, Math.max(0, Math.round(value)));
};

export function ResultCard({
  result,
  onUseAsQuery,
  onViewRecord,
}: ResultCardProps) {
  const t = useTranslations(DRUG_LOCALE);
  const [failed, setFailed] = useState(false);

  const similarity = toPercent(result.similarityScore);

  return (
    <Card
      variant='outlined'
      component='article'
      sx={{
        ...CARD_BASE_SX,
        transition: 'transform 250ms ease, box-shadow 250ms ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: (theme) =>
            `0 16px 32px -12px ${alpha(theme.palette.primary.main, 0.25)}`,
        },
        '&:hover .result-media': { transform: 'scale(1.05)' },
        '&:focus-within': {
          boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}`,
        },
      }}
    >
      <Box sx={MEDIA_FRAME_SX}>
        {failed ? (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              color: 'text.secondary',
            }}
          >
            <ImageOff size={24} aria-hidden />
            <Typography variant='caption'>
              {t('imageSearch.imageUnavailable')}
            </Typography>
          </Box>
        ) : (
          <CardMedia
            component='img'
            className='result-media'
            image={result.imageUrl}
            alt={result.drug.name}
            loading='lazy'
            onError={() => setFailed(true)}
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />
        )}

        <Chip
          size='small'
          label={t('imageSearch.similarity', { value: similarity })}
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            fontWeight: 700,
            color: 'text.primary',
            bgcolor: (theme) => alpha(theme.palette.background.paper, 0.94),
            backdropFilter: 'blur(8px)',
            boxShadow: 1,
          }}
        />
      </Box>

      <CardContent sx={BODY_SX}>
        <Box sx={lineSx(22)}>
          <Typography variant='subtitle2' noWrap title={result.drug.name}>
            {result.drug.name}
          </Typography>
        </Box>
        <Box sx={lineSx(20)}>
          <Typography variant='body2' color='text.secondary' noWrap>
            {result.drug.dosage}
          </Typography>
        </Box>
        <Box sx={lineSx(16)}>
          <Typography variant='caption' color='text.secondary' noWrap>
            {t('imageSearch.recordId', { id: result.drugId })}
          </Typography>
        </Box>
      </CardContent>

      <CardActions disableSpacing sx={FOOTER_SX}>
        <Button
          variant='contained'
          disableElevation
          fullWidth
          startIcon={<ExternalLink size={14} aria-hidden />}
          onClick={onViewRecord}
          sx={{ height: ACTION_HEIGHT }}
        >
          {t('imageSearch.viewRecord')}
        </Button>
        <Tooltip title={t('imageSearch.useAsQuery')}>
          <IconButton
            aria-label={t('imageSearch.useAsQuery')}
            onClick={() => onUseAsQuery(result.imageUrl)}
            sx={{
              width: ACTION_HEIGHT,
              height: ACTION_HEIGHT,
              flexShrink: 0,
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <ScanSearch size={16} aria-hidden />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export function ResultCardSkeleton() {
  return (
    <Card variant='outlined' component='article' aria-hidden sx={CARD_BASE_SX}>
      <Box sx={MEDIA_FRAME_SX}>
        <Skeleton
          variant='rectangular'
          animation='wave'
          sx={{ width: '100%', height: '100%' }}
        />
        <Skeleton
          variant='rounded'
          animation='wave'
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            width: 84,
            height: 24,
            borderRadius: 999,
          }}
        />
      </Box>

      <CardContent sx={BODY_SX}>
        <Box sx={lineSx(22)}>
          <Skeleton
            variant='rounded'
            animation='wave'
            width='70%'
            height={14}
          />
        </Box>
        <Box sx={lineSx(20)}>
          <Skeleton
            variant='rounded'
            animation='wave'
            width='45%'
            height={12}
          />
        </Box>
        <Box sx={lineSx(16)}>
          <Skeleton
            variant='rounded'
            animation='wave'
            width='30%'
            height={10}
          />
        </Box>
      </CardContent>

      <CardActions disableSpacing sx={FOOTER_SX}>
        <Skeleton
          variant='rounded'
          animation='wave'
          sx={{ flexGrow: 1, height: ACTION_HEIGHT, borderRadius: 1 }}
        />
        <Skeleton
          variant='rounded'
          animation='wave'
          sx={{
            width: ACTION_HEIGHT,
            height: ACTION_HEIGHT,
            flexShrink: 0,
            borderRadius: 1,
          }}
        />
      </CardActions>
    </Card>
  );
}
