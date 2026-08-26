'use client';
import { DRUG_LOCALE } from '../../constants';
import { useTranslation } from 'react-i18next';

import { ErrorChip } from '@/modules/common/components';
import type { IdentifiedDrug } from '../../types';
import {
  Section,
  SectionHeader,
  SectionTitle,
  FieldGroup,
  Label,
  StyledTextField,
  CancelButton,
  SubmitButton,
} from '../drug-drawer/drug-drawer-styles';
import { ErrorContainer } from '../ai-drug-generator/generate-drug-styles';
import { IdentityRow, StepActions } from './generate-drug-page-styles';

interface ConfirmIdentityStepProps {
  identifiedDrug: IdentifiedDrug;
  generating: boolean;
  error?: string;
  onEditPrompt: () => void;
  onConfirm: () => void;
}

export const ConfirmIdentityStep = ({
  identifiedDrug,
  generating,
  error,
  onEditPrompt,
  onConfirm,
}: ConfirmIdentityStepProps) => {
  const { t } = useTranslation(DRUG_LOCALE);

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>{t('generatePage.identifiedTitle')}</SectionTitle>
      </SectionHeader>

      <IdentityRow>
        <FieldGroup>
          <Label>{t('generatePage.name')}</Label>
          <StyledTextField
            size='small'
            value={identifiedDrug.name}
            slotProps={{ input: { readOnly: true } }}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>{t('generatePage.brand')}</Label>
          <StyledTextField
            size='small'
            value={identifiedDrug.brand}
            slotProps={{ input: { readOnly: true } }}
          />
        </FieldGroup>
      </IdentityRow>

      <ErrorContainer>
        {error && <ErrorChip message={error} maxWidth='100%' />}
      </ErrorContainer>

      <StepActions>
        <CancelButton
          type='button'
          onClick={onEditPrompt}
          disabled={generating}
        >
          {t('generatePage.editPrompt')}
        </CancelButton>

        <SubmitButton
          type='button'
          variant='contained'
          onClick={onConfirm}
          disabled={generating}
        >
          {generating
            ? t('generatePage.generatingDetails')
            : t('generatePage.confirm')}
        </SubmitButton>
      </StepActions>
    </Section>
  );
};
