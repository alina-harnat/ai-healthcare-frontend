import { styled, keyframes, alpha } from '@mui/material/styles';
import { Button } from '@mui/material';
import { SectionHeader } from '../drug-drawer/drug-drawer-styles';

const generateGlow = keyframes`
  0% {
    background-position: 0% 50%;
    opacity: 0.45;
  }
  50% {
    background-position: 100% 50%;
    opacity: 0.9;
  }
  100% {
    background-position: 0% 50%;
    opacity: 0.45;
  }
`;

const generateShimmer = keyframes`
  0% {
    transform: translateX(-120%);
  }
  100% {
    transform: translateX(120%);
  }
`;

export const GenerateSection = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1.5),
  background: `linear-gradient(
    135deg,
    ${theme.palette.secondary[100]},
    ${theme.palette.primary[100]}
  )`,
  border: `1px solid ${theme.palette.secondary[300]}`,
}));

export const GenerateRow = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'flex-start',
}));

export const GenerateButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  isolation: 'isolate',
  borderRadius: theme.spacing(1),
  whiteSpace: 'nowrap',
  minWidth: 105,
  backgroundColor: theme.palette.primary[500],
  color: theme.palette.background.paper,
  boxShadow: 'none',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',

  '&:hover': {
    backgroundColor: theme.palette.primary[400],
    transform: 'translateY(-1px)',
    boxShadow: `0 4px 12px ${theme.palette.primary[300]}`,
  },

  '&:disabled': {
    backgroundColor: theme.palette.primary[300],
    color: theme.palette.background.paper,
  },

  '&.generating': {
    background: `linear-gradient(
      90deg,
      ${theme.palette.primary[500]},
      ${theme.palette.secondary[500]},
      ${theme.palette.primary[500]}
    )`,
    backgroundSize: '200% 200%',
    animation: `${generateGlow} 2s ease infinite`,
    boxShadow: `0 0 0 1px ${theme.palette.secondary[300]},
                0 0 16px ${theme.palette.secondary[300]}`,
    pointerEvents: 'none',
  },

  '&.generating::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(
      90deg,
      transparent,
      ${alpha(theme.palette.background.paper, 0.35)},
      transparent
    )`,
    transform: 'translateX(-120%)',
    animation: `${generateShimmer} 1.6s ease-in-out infinite`,
    pointerEvents: 'none',
  },

  '&.generating .MuiButton-startIcon': {
    position: 'relative',
    zIndex: 1,
  },

  '&.generating .MuiButton-label': {
    position: 'relative',
    zIndex: 1,
  },
}));

export const ExpandableHeader = styled(SectionHeader)({
  cursor: 'pointer',
  justifyContent: 'space-between',
});

export const TitleWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const FormContainer = styled('div')({
  paddingTop: '12px',
});
