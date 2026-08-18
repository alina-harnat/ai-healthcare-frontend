'use client';

import { useTranslation } from 'react-i18next';

import { ErrorChip } from '@/modules/common/components';
import { DRUG_LOCALE } from '../../constants';
import {
  GenerateButton,
  FormContainer,
  PromptField,
  ErrorContainer,
} from './generate-drug-styles';

interface AiGeneratorFormProps {
  prompt: string;
  generating: boolean;
  error?: string;
  onPromptChange: (value: string) => void;
  onSubmit: () => void;
}

export const AiGeneratorForm = ({
  prompt,
  generating,
  error,
  onPromptChange,
  onSubmit,
}: AiGeneratorFormProps) => {
  const { t } = useTranslation(DRUG_LOCALE);

  return (
    <FormContainer>
      <PromptField
        size='small'
        fullWidth
        multiline
        minRows={5}
        maxRows={5}
        placeholder={t('generator.placeholder')}
        value={prompt}
        onChange={(event) => onPromptChange(event.target.value)}
        disabled={generating}
      />

      <GenerateButton
        type='button'
        className={generating ? 'generating' : undefined}
        disabled={generating || !prompt.trim()}
        onClick={onSubmit}
      >
        {generating ? t('generator.generating') : t('generator.generate')}
      </GenerateButton>

      <ErrorContainer>
        {error && <ErrorChip message={error} maxWidth='100%' />}
      </ErrorContainer>
    </FormContainer>
  );
};
