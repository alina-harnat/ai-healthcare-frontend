'use client';

import { useState } from 'react';
import { Collapse } from '@mui/material';
import { GenerateSection } from './generate-drug-styles';
import { AiGeneratorHeader } from './ai-generator-header';
import { AiGeneratorForm } from './ai-generator-form';

interface DrugAiGeneratorProps {
  generating: boolean;
  error?: string;
  onGenerate: (prompt: string) => void;
}

export const DrugAiGenerator = ({
  generating,
  error,
  onGenerate,
}: DrugAiGeneratorProps) => {
  const [prompt, setPrompt] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleGenerate = () => {
    const trimmed = prompt.trim();

    if (!trimmed || generating) {
      return;
    }

    onGenerate(trimmed);
  };

  return (
    <GenerateSection>
      <AiGeneratorHeader
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded((value) => !value)}
      />

      <Collapse in={isExpanded}>
        <AiGeneratorForm
          prompt={prompt}
          generating={generating}
          error={error}
          onPromptChange={setPrompt}
          onSubmit={handleGenerate}
        />
      </Collapse>
    </GenerateSection>
  );
};
