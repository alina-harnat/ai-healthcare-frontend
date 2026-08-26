import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { GenerateButton } from '../ai-drug-generator/generate-drug-styles';
import { StyledTextField } from '../drug-drawer/drug-drawer-styles';

export const PromptField = styled(StyledTextField)({
  '& textarea': {
    resize: 'none',
  },
});

export const IdentifyButton = styled(GenerateButton)({
  alignSelf: 'flex-end',
});

export const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  padding: theme.spacing(3),
  minWidth: 0,
  maxWidth: 900,
  marginInline: 'auto',
}));

export const PageHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
});

export const IdentityCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const IdentityRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flexWrap: 'wrap',

  '& > *': {
    flex: '1 1 200px',
  },
}));

export const StepActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1.5),
}));
