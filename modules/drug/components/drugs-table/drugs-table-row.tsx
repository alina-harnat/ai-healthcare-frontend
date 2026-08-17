import { Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  StyledTableRow,
  StyledTableCell,
  ActionsCell,
  EditButton,
  DeleteButton,
} from './drugs-table-styles';
import { TABLE_COLUMNS, CELL_COMPONENTS } from './drugs-table-columns';
import type { Drug } from '../../types';

interface DrugsTableRowProps {
  drug: Drug;
  onEdit: (drug: Drug) => void;
  onDelete: (drug: Drug) => void;
}

export const DrugsTableRow = ({
  drug,
  onEdit,
  onDelete,
}: DrugsTableRowProps) => {
  return (
    <StyledTableRow onClick={() => onEdit(drug)} sx={{ cursor: 'pointer' }}>
      {TABLE_COLUMNS.map((column) => {
        const Cell =
          CELL_COMPONENTS[column.key as keyof typeof CELL_COMPONENTS] ??
          StyledTableCell;

        return <Cell key={column.key}>{column.render(drug)}</Cell>;
      })}

      <ActionsCell>
        <Tooltip title='Edit drug'>
          <EditButton
            size='small'
            onClick={(event) => {
              event.stopPropagation();
              onEdit(drug);
            }}
          >
            <EditIcon fontSize='small' />
          </EditButton>
        </Tooltip>

        <Tooltip title='Delete drug'>
          <DeleteButton
            size='small'
            onClick={(event) => {
              event.stopPropagation();
              onDelete(drug);
            }}
          >
            <DeleteIcon fontSize='small' />
          </DeleteButton>
        </Tooltip>
      </ActionsCell>
    </StyledTableRow>
  );
};
