'use client';
import { DRUG_LOCALE } from '../../constants';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation(DRUG_LOCALE);

  return (
    <ExpandableHeader onClick={onToggle}>
      <TitleWrapper>
        <AutoAwesomeIcon color='primary' />
        <SectionTitle>{t('generator.title')}</SectionTitle>
      </TitleWrapper>

      {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    </ExpandableHeader>
  );
};
