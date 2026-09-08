import { styled } from '@mui/material/styles';
import { Box, TextField, Button, Typography } from '@mui/material';

export const PageContainer = styled(Box)({
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  minWidth: 0,
  maxWidth: 1600,
  margin: '0 auto',
});

export const Toolbar = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 16,
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const SearchField = styled(TextField)(({ theme }) => ({
  width: 300,

  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const Actions = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 16,
  width: 'auto',

  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const ErrorMessage = styled(Typography)({
  color: 'error',
});

export const DeleteErrorMessage = styled(Typography)({
  marginTop: 8,
  color: 'error',
});
