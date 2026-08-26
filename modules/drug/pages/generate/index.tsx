'use client';
import { DRUG_LOCALE } from '../../constants';
import { useRouter } from 'next/navigation';
import { IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';

import {
  IdentifyStep,
  ConfirmIdentityStep,
  ReviewDetailsStep,
  PageContainer,
  PageHeader,
} from '../../components';
import { useGenerateDrugPage, GenerateDrugStep } from '../../hooks';

export default function GenerateDrugPage() {
  const { t } = useTranslation(DRUG_LOCALE);
  const router = useRouter();

  const {
    step,
    prompt,
    setPrompt,
    identifiedDrug,
    form,
    identifying,
    identifyError,
    generatingDetails,
    generateDetailsError,
    creating,
    createError,
    handleIdentify,
    handleEditPrompt,
    handleConfirmIdentity,
    handleCreate,
  } = useGenerateDrugPage();

  return (
    <PageContainer>
      <PageHeader>
        <IconButton onClick={() => router.push('/drugs')} size='small'>
          <ArrowBackIcon fontSize='small' />
        </IconButton>

        <Typography variant='h6'>{t('generatePage.title')}</Typography>
      </PageHeader>

      {step === GenerateDrugStep.Prompt && (
        <IdentifyStep
          prompt={prompt}
          identifying={identifying}
          error={identifyError?.message}
          onPromptChange={setPrompt}
          onIdentify={handleIdentify}
        />
      )}

      {step === GenerateDrugStep.ConfirmIdentity && identifiedDrug && (
        <ConfirmIdentityStep
          identifiedDrug={identifiedDrug}
          generating={generatingDetails}
          error={generateDetailsError?.message}
          onEditPrompt={handleEditPrompt}
          onConfirm={handleConfirmIdentity}
        />
      )}

      {step === GenerateDrugStep.ReviewDetails && (
        <ReviewDetailsStep
          form={form}
          generating={generatingDetails}
          creating={creating}
          error={createError?.message}
          onCreate={handleCreate}
        />
      )}
    </PageContainer>
  );
}
