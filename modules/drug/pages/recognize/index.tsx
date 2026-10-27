'use client';

import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/core/localization/navigation';
import { DRUG_LOCALE } from '../../constants';
import { drugApi } from '../../api';
import type { DrugRecognition } from '../../types';
import { PageContainer, PageHeader } from '../../components/generate-drug-page';
import { DrugRoutes } from '../../enums';
import {
  ACCEPTED_IMAGE_TYPES,
  getImageRequestErrorKey,
  readFileAsBase64,
  validateImageFile,
} from '../../utils';

export function RecognizeDrugPage() {
  const t = useTranslations(DRUG_LOCALE);
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [result, setResult] = useState<DrugRecognition | null>(null);
  const [fileError, setFileError] = useState('');
  const [recognizeDrug, { loading }] = drugApi.useRecognizeDrugMutation();

  const handleFileChange = (selected?: File) => {
    setResult(null);
    setFileError('');
    if (!selected) return;
    const validation = validateImageFile(selected);
    if (validation.errorKey) {
      setFile(null);
      setPreview('');
      setFileError(t(validation.errorKey));
      return;
    }
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleRecognize = async () => {
    if (!file) return;
    const validation = validateImageFile(file);
    if (validation.errorKey) {
      setFileError(t(validation.errorKey));
      return;
    }

    let image: string;
    try {
      image = await readFileAsBase64(file);
    } catch {
      setFileError(t('recognition.readError'));
      return;
    }

    try {
      const response = await recognizeDrug({
        variables: {
          input: {
            image,
            mimeType: validation.mimeType,
          },
        },
      });
      setResult(response.data?.recognizeDrug ?? null);
    } catch (recognitionError) {
      setFileError(t(getImageRequestErrorKey(recognitionError)));
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push(DrugRoutes.Drugs)}
          size='small'
        >
          {t('recognition.back')}
        </Button>
        <Typography variant='h6'>{t('recognition.title')}</Typography>
      </PageHeader>

      <Card variant='outlined'>
        <CardContent>
          <Stack spacing={2}>
            <Typography color='text.secondary'>
              {t('recognition.description')}
            </Typography>
            <Button
              component='label'
              variant='outlined'
              startIcon={<ImageSearchIcon />}
            >
              {file
                ? t('recognition.changeImage')
                : t('recognition.chooseImage')}
              <input
                hidden
                type='file'
                accept={ACCEPTED_IMAGE_TYPES}
                onChange={(event) => handleFileChange(event.target.files?.[0])}
              />
            </Button>
            {preview && (
              <Box
                component='img'
                src={preview}
                alt={t('recognition.previewAlt')}
                sx={{
                  maxHeight: 320,
                  maxWidth: '100%',
                  objectFit: 'contain',
                  alignSelf: 'flex-start',
                }}
              />
            )}
            {fileError && <Alert severity='error'>{fileError}</Alert>}
            <Button
              variant='contained'
              onClick={handleRecognize}
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
              {loading ? t('recognition.loading') : t('recognition.recognize')}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {result && (
        <Card variant='outlined'>
          <CardContent>
            <Stack spacing={1}>
              <Typography variant='h6'>
                {t('recognition.resultTitle')}
              </Typography>
              <Typography>
                <strong>{t('recognition.medicineName')}:</strong>{' '}
                {result.medicine_name || t('recognition.notAvailable')}
              </Typography>
              <Typography>
                <strong>{t('recognition.dosage')}:</strong>{' '}
                {result.dosage || t('recognition.notAvailable')}
              </Typography>
              <Typography>
                <strong>{t('recognition.manufacturer')}:</strong>{' '}
                {result.manufacturer || t('recognition.notAvailable')}
              </Typography>
              <Typography>
                <strong>{t('recognition.activeIngredients')}:</strong>{' '}
                {result.active_ingredients.length
                  ? result.active_ingredients.join(', ')
                  : t('recognition.notAvailable')}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      )}
    </PageContainer>
  );
}
