'use client';

import { FormHelperText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { StyledTextField } from '../drug-drawer/drug-drawer-styles';
import {
  GenerateRow,
  GenerateButton,
  FormContainer,
} from './generate-drug-styles';
import { DRUG_LOCALE } from '../../constants';

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
      <GenerateRow>
        <StyledTextField
          size='small'
          fullWidth
          multiline
          minRows={2}
          maxRows={4}
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
      </GenerateRow>

      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormContainer>
  );
};
