'use client';

import { useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CropFreeIcon from '@mui/icons-material/CropFree';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/core/localization/navigation';
import { CommonRoutes, Permission } from '@/modules/common/enums';
import { useHasPermissions } from '@/modules/common/hooks/use-permissions';
import { useCurrentUser } from '@/modules/user/providers';
import { DRUG_LOCALE } from '../../constants';
import { DrugRoutes } from '../../enums';
import { useObjectDetection } from '../../hooks';
import { PageContainer, PageHeader } from '../../components/generate-drug-page';
import { ImagePicker } from '../../components/image-picker';

export function DetectObjectsPage() {
  const t = useTranslations(DRUG_LOCALE);
  const router = useRouter();
  const { loading: userLoading } = useCurrentUser();
  const { hasPermission } = useHasPermissions();
  const isAdmin = hasPermission(Permission.Admin);

  const {
    file,
    preview,
    fileErrorKey,
    objects,
    boxes,
    loading,
    requestErrorKey,
    handleFileChange,
    handleDetect,
  } = useObjectDetection();

  useEffect(() => {
    if (!userLoading && !isAdmin) {
      router.replace(CommonRoutes.Forbidden);
    }
  }, [userLoading, isAdmin, router]);

  if (!isAdmin) {
    return null;
  }

  return (
    <PageContainer>
      <PageHeader>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push(DrugRoutes.Drugs)}
          size='small'
        >
          {t('detection.back')}
        </Button>
        <Typography variant='h6'>{t('detection.title')}</Typography>
      </PageHeader>

      <Card variant='outlined'>
        <CardContent>
          <Stack spacing={2}>
            <Typography color='text.secondary'>
              {t('detection.description')}
            </Typography>
            <ImagePicker
              label={
                file ? t('detection.changeImage') : t('detection.chooseImage')
              }
              disabled={loading}
              onChange={handleFileChange}
            />
            {preview && (
              <Box
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  alignSelf: 'flex-start',
                  maxWidth: '100%',
                  lineHeight: 0,
                }}
              >
                <Box
                  component='img'
                  src={preview}
                  alt={t('detection.previewAlt')}
                  sx={{
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: 480,
                    width: 'auto',
                    height: 'auto',
                  }}
                />
                {boxes.map((box, index) => (
                  <Box
                    key={`${box.label}-${index}`}
                    sx={{
                      position: 'absolute',
                      left: box.left,
                      top: box.top,
                      width: box.width,
                      height: box.height,
                      border: 2,
                      borderColor: 'primary.main',
                      borderRadius: 0.5,
                      pointerEvents: 'none',
                    }}
                  >
                    <Typography
                      variant='caption'
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        px: 0.5,
                        lineHeight: 1.6,
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {box.label || t('detection.unlabeled')}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
            {fileErrorKey && <Alert severity='error'>{t(fileErrorKey)}</Alert>}
            {requestErrorKey && (
              <Alert severity='error'>{t(requestErrorKey)}</Alert>
            )}
            <Button
              variant='contained'
              onClick={handleDetect}
              disabled={!file || loading}
              startIcon={
                loading ? (
                  <CircularProgress size={18} color='inherit' />
                ) : (
                  <CropFreeIcon />
                )
              }
              sx={{ alignSelf: 'flex-start' }}
            >
              {loading ? t('detection.loading') : t('detection.detect')}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {objects && (
        <Card variant='outlined'>
          <CardContent>
            <Stack spacing={1.5}>
              <Typography variant='h6'>
                {t('detection.resultTitle', { count: boxes.length })}
              </Typography>
              {boxes.length ? (
                <Stack
                  direction='row'
                  spacing={1}
                  useFlexGap
                  sx={{ flexWrap: 'wrap' }}
                >
                  {boxes.map((box, index) => (
                    <Chip
                      key={`${box.label}-${index}`}
                      label={box.label || t('detection.unlabeled')}
                    />
                  ))}
                </Stack>
              ) : (
                <Typography color='text.secondary'>
                  {t('detection.noObjects')}
                </Typography>
              )}
            </Stack>
          </CardContent>
        </Card>
      )}
    </PageContainer>
  );
}
