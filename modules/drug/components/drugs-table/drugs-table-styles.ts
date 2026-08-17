import { styled } from '@mui/material/styles';

import {
  Chip,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
} from '@mui/material';

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  margin: '24px auto',
  maxHeight: 'calc(100vh - 48px)',
  maxWidth: 1400,
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
  position: 'sticky',
  top: 0,
  zIndex: 2,

  backgroundColor: theme.palette.secondary[200],
  color: theme.palette.text.secondary,

  fontSize: 13,
  fontWeight: 600,
  whiteSpace: 'nowrap',

  borderBottom: `1px solid ${theme.palette.divider}`,
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

export const NoBreakTableCell = styled(StyledTableCell)({
  maxWidth: 160,
  wordBreak: 'normal',
  overflowWrap: 'normal',
});

export const DescriptionTableCell = styled(StyledTableCell)({
  maxHeight: 96,
  overflowY: 'auto',
  lineHeight: 1.4,
});

export const ChipsCell = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 4,
});

export const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.secondary[100],
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.secondary[300]}`,
  fontSize: 12,
  height: 22,
}));

export const ActionsCell = styled(TableCell)(({ theme }) => ({
  width: 80,
  padding: 10,
  textAlign: 'center',
  verticalAlign: 'top',
  borderBottom: `1px solid ${theme.palette.divider}`,
  whiteSpace: 'nowrap',
}));

export const EditButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,

  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary[100],
  },
}));

export const DeleteButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,

  '&:hover': {
    color: theme.palette.error.main,
    backgroundColor: theme.palette.error[100],
  },
}));
