'use client';
import { DRUG_LOCALE } from '../../constants';
import { useTranslation } from 'react-i18next';

import { ErrorChip } from '@/modules/common/components';
import {
  Section,
  SectionHeader,
  SectionTitle,
} from '../drug-drawer/drug-drawer-styles';
import {
  FormContainer,
  ErrorContainer,
} from '../ai-drug-generator/generate-drug-styles';
import { PromptField, IdentifyButton } from './generate-drug-page-styles';

interface IdentifyStepProps {
  prompt: string;
  identifying: boolean;
  error?: string;
  onPromptChange: (value: string) => void;
  onIdentify: () => void;
}

export const IdentifyStep = ({
  prompt,
  identifying,
  error,
  onPromptChange,
  onIdentify,
}: IdentifyStepProps) => {
  const { t } = useTranslation(DRUG_LOCALE);

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>{t('generatePage.describeTitle')}</SectionTitle>
      </SectionHeader>

      <FormContainer>
        <PromptField
          size='small'
          fullWidth
          multiline
          minRows={6}
          maxRows={10}
          placeholder={t('generatePage.promptPlaceholder')}
          value={prompt}
          onChange={(event) => onPromptChange(event.target.value)}
          disabled={identifying}
        />

        <IdentifyButton
          type='button'
          variant='contained'
          className={identifying ? 'generating' : undefined}
          disabled={identifying || !prompt.trim()}
          onClick={onIdentify}
        >
          {identifying
            ? t('generatePage.identifying')
            : t('generatePage.identify')}
        </IdentifyButton>

        <ErrorContainer>
          {error && <ErrorChip message={error} maxWidth='100%' />}
        </ErrorContainer>
      </FormContainer>
    </Section>
  );
};
