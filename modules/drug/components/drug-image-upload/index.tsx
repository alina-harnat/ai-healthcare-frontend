'use client';

import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useTranslations } from 'next-intl';

import { DRUG_LOCALE } from '../../constants';
import { useDrugImageUpload } from '../../hooks';
import { ImagePicker } from '../image-picker';
import {
  Section,
  SectionHeader,
  SectionTitle,
} from '../drug-drawer/drug-drawer-styles';

interface DrugImageUploadProps {
  drugId: string;
}

export const DrugImageUpload = ({ drugId }: DrugImageUploadProps) => {
  const t = useTranslations(DRUG_LOCALE);

  const {
    file,
    preview,
    fileErrorKey,
    requestErrorKey,
    uploadedImage,
    now,
    loading,
    handleFileChange,
    handleClearSelection,
    handleUpload,
  } = useDrugImageUpload(drugId);

  const uploadedExpired = uploadedImage ? now >= uploadedImage.expiresAt : false;

  return (
    <Section>
      <SectionHeader>
        <PhotoCameraOutlinedIcon />
        <SectionTitle>{t('photoUpload.title')}</SectionTitle>
      </SectionHeader>

      <Typography variant='body2' color='text.secondary'>
        {t('photoUpload.description')}
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <ImagePicker
          label={
            file ? t('photoUpload.changeImage') : t('photoUpload.chooseImage')
          }
          disabled={loading}
          onChange={handleFileChange}
        />
        {file && (
          <Button
            type='button'
            variant='text'
            disabled={loading}
            onClick={handleClearSelection}
          >
            {t('photoUpload.clearSelection')}
          </Button>
        )}
      </Box>

      {file && (
        <Typography variant='body2' color='text.secondary'>
          {t('photoUpload.selectedFile', { name: file.name })}
        </Typography>
      )}

      {preview && (
        <Box
          component='img'
          src={preview}
          alt={t('photoUpload.previewAlt')}
          sx={{
            maxHeight: 240,
            maxWidth: '100%',
            objectFit: 'contain',
            alignSelf: 'flex-start',
            borderRadius: 1,
          }}
        />
      )}

      {fileErrorKey && <Alert severity='error'>{t(fileErrorKey)}</Alert>}
      {requestErrorKey && <Alert severity='error'>{t(requestErrorKey)}</Alert>}

      <Button
        type='button'
        variant='contained'
        onClick={handleUpload}
        disabled={!file || loading}
        startIcon={
          loading ? (
            <CircularProgress size={18} color='inherit' />
          ) : (
            <CloudUploadIcon />
          )
        }
        sx={{ alignSelf: 'flex-start' }}
      >
        {loading ? t('photoUpload.uploading') : t('photoUpload.upload')}
      </Button>

      {uploadedImage && (
        <>
          <Alert severity='success'>{t('photoUpload.success')}</Alert>
          {uploadedExpired ? (
            <Box
              sx={{
                height: 160,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                bgcolor: 'action.hover',
                borderRadius: 1,
                p: 1,
              }}
            >
              <Typography variant='caption' color='text.secondary'>
                {t('photoUpload.expired')}
              </Typography>
            </Box>
          ) : (
            <Box
              component='img'
              src={uploadedImage.imageUrl}
              alt={t('photoUpload.uploadedAlt', {
                name: uploadedImage.drug.name,
              })}
              sx={{
                display: 'block',
                maxHeight: 240,
                maxWidth: '100%',
                objectFit: 'contain',
                alignSelf: 'flex-start',
                bgcolor: 'action.hover',
                borderRadius: 1,
              }}
            />
          )}
          <Typography variant='caption' color='text.secondary'>
            {t('photoUpload.expiryNotice')}
          </Typography>
        </>
      )}
    </Section>
  );
};
