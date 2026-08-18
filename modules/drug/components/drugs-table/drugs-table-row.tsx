import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DRUG_LOCALE } from '../../constants';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  StyledTableRow,
  StyledTableCell,
  ActionsCell,
  EditButton,
  DeleteButton,
} from './drugs-table-styles';
import { TABLE_COLUMNS } from './drugs-table-columns';
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
  const { t } = useTranslation(DRUG_LOCALE);

  return (
    <StyledTableRow onClick={() => onEdit(drug)} sx={{ cursor: 'pointer' }}>
      {TABLE_COLUMNS.map((column) => (
        <StyledTableCell key={column.key}>
          {column.render(drug)}
        </StyledTableCell>
      ))}

      <ActionsCell>
        <Tooltip title={t('table.edit')}>
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

        <Tooltip title={t('table.delete')}>
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
