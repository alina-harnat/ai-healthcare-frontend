import { styled } from '@mui/material/styles';

export const Page = styled('main')(({ theme }) => ({
  minHeight: '100dvh',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    alignItems: 'flex-start',
    paddingTop: theme.spacing(6),
  },
}));
