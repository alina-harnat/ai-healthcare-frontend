import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import NextLink from 'next/link';

export const AuthCard = styled('section')(({ theme }) => ({
  width: '100%',
  maxWidth: 500,
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: '0 8px 30px rgba(15, 23, 42, 0.06)',

  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1.5),
    gap: theme.spacing(3),
    margin: '200px 0',
  },
}));

export const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(5),

  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(3),
  },
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

    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey[500],
    },

    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary[500],
      borderWidth: 1,
    },

    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.error[500],
    },
  },

  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,

    '&::placeholder': {
      color: theme.palette.primary[200],
    },
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  width: '100%',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.primary[500],
  color: theme.palette.background.paper,
  fontSize: '0.9375rem',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: theme.palette.primary[400],
  },

  '&:disabled': {
    backgroundColor: theme.palette.primary[300],
    color: theme.palette.background.paper,
  },
}));

export const Switch = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
}));

export const SwitchLink = styled(NextLink)(({ theme }) => ({
  color: theme.palette.primary[500],
  fontWeight: 600,
  textDecoration: 'none',

  '&:hover': {
    color: theme.palette.primary[400],
    textDecoration: 'underline',
  },
}));

export const ErrorContainer = styled('div')(({ theme }) => ({
  minHeight: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.error.main,
  fontSize: '0.875rem',
}));
