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
    uploadedImages,
    now,
    loading,
    handleFileChange,
    handleUpload,
  } = useDrugImageUpload(drugId);

  return (
    <Section>
      <SectionHeader>
        <PhotoCameraOutlinedIcon />
        <SectionTitle>{t('photoUpload.title')}</SectionTitle>
      </SectionHeader>

      <Typography variant='body2' color='text.secondary'>
        {t('photoUpload.description')}
      </Typography>

      <ImagePicker
        label={
          file ? t('photoUpload.changeImage') : t('photoUpload.chooseImage')
        }
        disabled={loading}
        onChange={handleFileChange}
      />

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

      {!!uploadedImages.length && (
        <>
          <Alert severity='success'>{t('photoUpload.success')}</Alert>
          <Box
            sx={{
              display: 'grid',
              gap: 1.5,
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            }}
          >
            {uploadedImages.map((image) => {
              const expired = now >= image.expiresAt;

              return (
                <Box key={image.id}>
                  {expired ? (
                    <Box
                      sx={{
                        height: 120,
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
                      src={image.imageUrl}
                      alt={t('photoUpload.uploadedAlt', {
                        name: image.drug.name,
                      })}
                      sx={{
                        display: 'block',
                        width: '100%',
                        height: 120,
                        objectFit: 'cover',
                        bgcolor: 'action.hover',
                        borderRadius: 1,
                      }}
                    />
                  )}
                  <Typography variant='caption' color='text.secondary'>
                    {new Date(image.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              );
            })}
          </Box>
          <Typography variant='caption' color='text.secondary'>
            {t('photoUpload.expiryNotice')}
          </Typography>
        </>
      )}
    </Section>
  );
};
