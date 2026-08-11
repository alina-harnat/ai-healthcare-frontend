import { styled } from '@mui/material/styles';

import { Table, TableCell, TableContainer, TableRow } from '@mui/material';

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  margin: '300px',
  maxHeight: 'calc(100vh - 180px)',
  maxWidth: 1200,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 12,
  backgroundColor: theme.palette.background.paper,
}));

export const StyledTable = styled(Table)({
  minWidth: 600,
  borderCollapse: 'separate',
  borderSpacing: 0,
});

export const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.secondary[200],

  color: theme.palette.text.secondary,

  fontSize: 13,
  fontWeight: 600,

  whiteSpace: 'nowrap',

  borderBottom: `1px solid ${theme.palette.divider}`,

  zIndex: 2,
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td': {
    borderBottom: 0,
  },

  '&:hover': {
    backgroundColor: theme.palette.grey[50],
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,

  fontSize: 14,

  verticalAlign: 'top',

  borderBottom: `1px solid ${theme.palette.divider}`,

  maxWidth: 280,

  whiteSpace: 'normal',

  wordBreak: 'break-word',
}));

export const EditCell = styled(TableCell)(({ theme }) => ({
  width: 64,

  padding: 8,

  textAlign: 'center',

  verticalAlign: 'top',

  borderBottom: `1px solid ${theme.palette.divider}`,

  '& .MuiIconButton-root': {
    color: theme.palette.text.secondary,

    '&:hover': {
      color: theme.palette.primary.main,

      backgroundColor: theme.palette.primary[100],
    },
  },
}));
