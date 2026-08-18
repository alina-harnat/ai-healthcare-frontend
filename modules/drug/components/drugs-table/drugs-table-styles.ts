import { styled } from '@mui/material/styles';

import {
  Chip,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
} from '@mui/material';

export const ROW_HEIGHT = 64;
export const HEADER_HEIGHT = 56;
const VISIBLE_ROWS = 10;

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  margin: '24px auto',
  height: HEADER_HEIGHT + ROW_HEIGHT * VISIBLE_ROWS,
  maxWidth: 1600,
  width: '100%',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 12,
  backgroundColor: theme.palette.background.paper,
}));

export const StyledTable = styled(Table)({
  width: '100%',
  minWidth: 960,
  tableLayout: 'fixed',
  borderCollapse: 'separate',
  borderSpacing: 0,
});

export const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 2,

  height: HEADER_HEIGHT,
  backgroundColor: theme.palette.secondary[300],
  color: theme.palette.text.secondary,

  fontSize: 13,
  fontWeight: 600,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  height: ROW_HEIGHT,

  '&:last-child td': {
    borderBottom: 0,
  },

  '&:hover': {
    backgroundColor: theme.palette.grey[50],
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  height: ROW_HEIGHT,
  color: theme.palette.text.primary,

  fontSize: 14,

  verticalAlign: 'middle',

  borderBottom: `1px solid ${theme.palette.divider}`,

  overflow: 'hidden',
}));

export const TruncatedText = styled('span')({
  display: 'block',
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const ChipsCellWrapper = styled('div')({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
});

export const ChipsCell = styled('div')({
  display: 'flex',
  flexWrap: 'nowrap',
  overflow: 'hidden',
  gap: 4,
});

export const MeasureRow = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  visibility: 'hidden',
  pointerEvents: 'none',
  display: 'flex',
  flexWrap: 'nowrap',
  gap: 4,
});

export const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.secondary[100],
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.secondary[300]}`,
  fontSize: 12,
  height: 22,
  flexShrink: 0,
}));

export const MoreChip = styled(StyledChip)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderColor: theme.palette.grey[300],
  color: theme.palette.text.secondary,
  fontWeight: 700,
  cursor: 'default',
}));

export const ActionsCell = styled(TableCell)(({ theme }) => ({
  width: 88,
  padding: 10,
  textAlign: 'center',
  verticalAlign: 'middle',
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
