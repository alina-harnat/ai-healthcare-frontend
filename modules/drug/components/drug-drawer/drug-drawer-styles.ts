import { styled } from '@mui/material/styles';
import { Button, Drawer, IconButton, TextField } from '@mui/material';

export const DRAWER_WIDTH = 480;

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    maxWidth: '100vw',
    backgroundColor: theme.palette.background.paper,
  },

  [theme.breakpoints.down('sm')]: {
    '& .MuiDrawer-paper': {
      width: '100vw',
    },
  },
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const DrawerTitle = styled('h2')(({ theme }) => ({
  margin: 0,
  fontSize: '1.125rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const DrawerBody = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  padding: theme.spacing(3),
  overflowY: 'auto',
  flex: 1,
}));

export const Section = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,

  '&:last-of-type': {
    borderBottom: 'none',
    paddingBottom: 0,
  },
}));

export const SectionHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.primary[500],

  '& svg': {
    fontSize: 20,
  },
}));

export const SectionTitle = styled('span')(({ theme }) => ({
  fontSize: '0.9375rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const FieldGroup = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const Label = styled('label')(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

export const ChipInputRow = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'flex-start',
}));

export const ChipsWrap = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  minHeight: 22,
}));

export const ErrorContainer = styled('div')(({ theme }) => ({
  minHeight: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.error.main,
  fontSize: '0.875rem',
}));

export const DrawerFooter = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1.5),
  padding: theme.spacing(2, 3),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.primary[500],
  color: theme.palette.background.paper,

  '&:hover': {
    backgroundColor: theme.palette.primary[400],
  },

  '&:disabled': {
    backgroundColor: theme.palette.primary[300],
    color: theme.palette.background.paper,
  },
}));
