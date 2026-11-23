import { CircularProgress, Tooltip } from '@mui/material';
import { useTranslations } from 'next-intl';
import { DRUG_LOCALE } from '../../constants';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

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
  onUploadImage?: (drug: Drug) => void;
}

export const DrugsTableRow = ({
  drug,
  onEdit,
  onDelete,
  onUploadImage,
}: DrugsTableRowProps) => {
  const t = useTranslations(DRUG_LOCALE);
  const pending = !!drug.pending;

  return (
    <StyledTableRow
      pending={pending}
      onClick={() => !pending && onEdit(drug)}
      sx={{ cursor: pending ? 'default' : 'pointer' }}
    >
      {TABLE_COLUMNS.map((column) => (
        <StyledTableCell key={column.key}>
          {column.render(drug)}
        </StyledTableCell>
      ))}

      <ActionsCell sx={onUploadImage ? { width: 136 } : undefined}>
        {pending ? (
          <CircularProgress size={18} />
        ) : (
          <>
            {onUploadImage && (
              <Tooltip title={t('table.uploadImage')}>
                <EditButton
                  size='small'
                  aria-label={t('table.uploadImage')}
                  onClick={(event) => {
                    event.stopPropagation();
                    onUploadImage(drug);
                  }}
                >
                  <CloudUploadOutlinedIcon fontSize='small' />
                </EditButton>
              </Tooltip>
            )}

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
          </>
        )}
      </ActionsCell>
    </StyledTableRow>
  );
};
