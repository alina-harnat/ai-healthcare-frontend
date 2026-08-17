'use client';

import {
  IconButton,
  TableBody,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

import {
  StyledTableContainer,
  StyledTable,
  StyledHeaderCell,
  StyledTableRow,
  StyledTableCell,
  EditCell,
} from './drugs-table-styles';

export type Drug = {
  id: string;
  name: string;
  brand: string;
  description: string;
  indications: string[];
  contraindications: string[];
  dosage: string;
  sideEffects: string[];
  activeIngredients: string[];
};

interface DrugsTableProps {
  drugs: Drug[];
  onEdit: (drug: Drug) => void;
}

const TABLE_COLUMNS = [
  {
    key: 'name',
    label: 'Name',
    render: (drug: Drug) => drug.name,
  },
  {
    key: 'brand',
    label: 'Brand',
    render: (drug: Drug) => drug.brand,
  },
  {
    key: 'description',
    label: 'Description',
    render: (drug: Drug) => drug.description,
  },
  {
    key: 'indications',
    label: 'Indications',
    render: (drug: Drug) => drug.indications.join(', '),
  },
  {
    key: 'contraindications',
    label: 'Contraindications',
    render: (drug: Drug) => drug.contraindications.join(', '),
  },
  {
    key: 'dosage',
    label: 'Dosage',
    render: (drug: Drug) => drug.dosage,
  },
  {
    key: 'sideEffects',
    label: 'Side effects',
    render: (drug: Drug) => drug.sideEffects.join(', '),
  },
  {
    key: 'activeIngredients',
    label: 'Active ingredients',
    render: (drug: Drug) => drug.activeIngredients.join(', '),
  },
] as const;

export const DrugsTable = ({ drugs, onEdit }: DrugsTableProps) => {
  return (
    <StyledTableContainer>
      <StyledTable stickyHeader>
        <TableHead>
          <TableRow>
            {TABLE_COLUMNS.map((column) => (
              <StyledHeaderCell key={column.key}>
                {column.label}
              </StyledHeaderCell>
            ))}

            <StyledHeaderCell align='center'>Actions</StyledHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {drugs.map((drug) => (
            <StyledTableRow key={drug.id}>
              {TABLE_COLUMNS.map((column) => (
                <StyledTableCell key={column.key}>
                  {column.render(drug)}
                </StyledTableCell>
              ))}

              <EditCell>
                <Tooltip title='Edit drug'>
                  <IconButton size='small' onClick={() => onEdit(drug)}>
                    <EditIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </EditCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};
