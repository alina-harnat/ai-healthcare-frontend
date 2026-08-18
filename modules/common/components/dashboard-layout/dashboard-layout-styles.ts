import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const Root = styled(Box)({
  display: 'flex',
  minHeight: '100dvh',
});

export const Content = styled('main')(({ theme }) => ({
  flexGrow: 1,
  minWidth: 0,
  backgroundColor: theme.palette.background.default,
}));
