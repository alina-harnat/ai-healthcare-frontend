'use client';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { SectionTitle } from '../drug-drawer/drug-drawer-styles';
import { ExpandableHeader, TitleWrapper } from './generate-drug-styles';

interface AiGeneratorHeaderProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export const AiGeneratorHeader = ({
  isExpanded,
  onToggle,
}: AiGeneratorHeaderProps) => {
  return (
    <ExpandableHeader onClick={onToggle}>
      <TitleWrapper>
        <AutoAwesomeIcon color='primary' />
        <SectionTitle>Generate with AI</SectionTitle>
      </TitleWrapper>

      {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    </ExpandableHeader>
  );
};
