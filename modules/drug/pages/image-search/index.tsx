'use client';

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/core/localization/navigation';
import { DRUG_LOCALE } from '../../constants';
import { DrugRoutes } from '../../enums';
import { useImageSearch } from '../../hooks';
import { PageContainer, PageHeader } from '../../components/generate-drug-page';
import { ImagePicker } from '../../components/image-picker';

export function ImageSearchPage() {
  const t = useTranslations(DRUG_LOCALE);
  const router = useRouter();

  const {
    file,
    preview,
    fileErrorKey,
    minSimilarityScore,
    setMinSimilarityScore,
    results,
    hasMore,
    loading,
    requestErrorKey,
    handleFileChange,
    handleSearch,
    handleLoadMore,
  } = useImageSearch();

  return (
    <PageContainer>
      <PageHeader>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push(DrugRoutes.Drugs)}
          size='small'
        >
          {t('imageSearch.back')}
        </Button>
        <Typography variant='h6'>{t('imageSearch.title')}</Typography>
      </PageHeader>

      <Card variant='outlined'>
        <CardContent>
          <Stack spacing={2}>
            <Typography color='text.secondary'>
              {t('imageSearch.description')}
            </Typography>
            <ImagePicker
              label={
                file
                  ? t('imageSearch.changeImage')
                  : t('imageSearch.chooseImage')
              }
              disabled={loading}
              onChange={handleFileChange}
            />
            {preview && (
              <Box
                component='img'
                src={preview}
                alt={t('imageSearch.previewAlt')}
                sx={{
                  maxHeight: 320,
                  maxWidth: '100%',
                  objectFit: 'contain',
                  alignSelf: 'flex-start',
                }}
              />
            )}
            <Box sx={{ maxWidth: 360 }}>
              <Typography variant='body2' gutterBottom>
                {t('imageSearch.minSimilarity', {
                  value: Math.round(minSimilarityScore * 100),
                })}
              </Typography>
              <Slider
                value={minSimilarityScore}
                min={0}
                max={1}
                step={0.05}
                disabled={loading}
                onChange={(_, value) => setMinSimilarityScore(value as number)}
              />
            </Box>
            {fileErrorKey && <Alert severity='error'>{t(fileErrorKey)}</Alert>}
            {requestErrorKey && (
              <Alert severity='error'>{t(requestErrorKey)}</Alert>
            )}
            <Button
              variant='contained'
              onClick={handleSearch}
              disabled={!file || loading}
              startIcon={
                loading ? (
                  <CircularProgress size={18} color='inherit' />
                ) : (
                  <ImageSearchIcon />
                )
              }
              sx={{ alignSelf: 'flex-start' }}
            >
              {loading ? t('imageSearch.loading') : t('imageSearch.search')}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {results && (
        <Stack spacing={2}>
          <Typography variant='h6'>{t('imageSearch.resultTitle')}</Typography>
          {!results.length && (
            <Typography color='text.secondary'>
              {t('imageSearch.noResults')}
            </Typography>
          )}
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            }}
          >
            {results.map((result) => (
              <Card key={result.id} variant='outlined'>
                <Box
                  component='img'
                  src={result.imageUrl}
                  alt={result.drug.name}
                  loading='lazy'
                  sx={{
                    display: 'block',
                    width: '100%',
                    height: 180,
                    objectFit: 'cover',
                    bgcolor: 'action.hover',
                  }}
                />
                <CardContent>
                  <Stack spacing={1}>
                    <Stack
                      direction='row'
                      spacing={1}
                      sx={{
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant='subtitle1' noWrap>
                          {result.drug.name}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          noWrap
                        >
                          {result.drug.brand}
                        </Typography>
                      </Box>
                      <Chip
                        size='small'
                        color='primary'
                        label={t('imageSearch.similarity', {
                          value: Math.round(result.similarityScore * 100),
                        })}
                      />
                    </Stack>
                    {result.drug.dosage && (
                      <Typography variant='body2'>
                        <strong>{t('imageSearch.dosage')}:</strong>{' '}
                        {result.drug.dosage}
                      </Typography>
                    )}
                    {!!result.drug.activeIngredients.length && (
                      <Typography variant='body2'>
                        <strong>{t('imageSearch.activeIngredients')}:</strong>{' '}
                        {result.drug.activeIngredients.join(', ')}
                      </Typography>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>
          {hasMore && (
            <Button
              variant='outlined'
              onClick={handleLoadMore}
              disabled={loading}
              sx={{ alignSelf: 'center' }}
            >
              {loading ? t('imageSearch.loading') : t('imageSearch.loadMore')}
            </Button>
          )}
        </Stack>
      )}
    </PageContainer>
  );
}
