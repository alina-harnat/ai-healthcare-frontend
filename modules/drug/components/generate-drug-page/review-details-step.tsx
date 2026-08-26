'use client';
import { DRUG_LOCALE } from '../../constants';
import { FormProvider, type UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ErrorChip } from '@/modules/common/components';
import type { DrugFormValues } from '../../schemas';
import { DrugFormSkeleton } from '../drug-form skeleton';
import {
  GeneralInfoSection,
  UsageSection,
  SafetySection,
  IngredientsSection,
} from '../drug-drawer/sections';
import {
  Section,
  SectionHeader,
  SectionTitle,
  SubmitButton,
} from '../drug-drawer/drug-drawer-styles';
import { ErrorContainer } from '../ai-drug-generator/generate-drug-styles';
import { StepActions } from './generate-drug-page-styles';

interface ReviewDetailsStepProps {
  form: UseFormReturn<DrugFormValues>;
  generating: boolean;
  creating: boolean;
  error?: string;
  onCreate: () => void;
}

export const ReviewDetailsStep = ({
  form,
  generating,
  creating,
  error,
  onCreate,
}: ReviewDetailsStepProps) => {
  const { t } = useTranslation(DRUG_LOCALE);

  if (generating) {
    return <DrugFormSkeleton />;
  }

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>{t('generatePage.reviewTitle')}</SectionTitle>
      </SectionHeader>

      <FormProvider {...form}>
        <GeneralInfoSection />
        <UsageSection />
        <SafetySection />
        <IngredientsSection />
      </FormProvider>

      <ErrorContainer>
        {error && <ErrorChip message={error} maxWidth='100%' />}
      </ErrorContainer>

      <StepActions>
        <SubmitButton
          variant='contained'
          onClick={onCreate}
          disabled={creating}
        >
          {creating ? t('generatePage.creating') : t('generatePage.create')}
        </SubmitButton>
      </StepActions>
    </Section>
  );
};
