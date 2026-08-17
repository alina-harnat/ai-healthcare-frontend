'use client';

import { FormHelperText } from '@mui/material';
import { StyledTextField } from '../drug-drawer/drug-drawer-styles';
import {
  GenerateRow,
  GenerateButton,
  FormContainer,
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
  return (
    <FormContainer>
      <GenerateRow>
        <StyledTextField
          size='small'
          fullWidth
          multiline
          minRows={2}
          maxRows={4}
          placeholder='Describe the drug you want to generate'
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
          {generating ? 'Generating...' : 'Generate'}
        </GenerateButton>
      </GenerateRow>

      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormContainer>
  );
};
