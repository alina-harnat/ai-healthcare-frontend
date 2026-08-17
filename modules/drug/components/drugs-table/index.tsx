'use client';

import { useEffect, useRef } from 'react';

import {
  CircularProgress,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  StyledTableContainer,
  StyledTable,
  StyledHeaderCell,
  StyledTableRow,
  StyledTableCell,
  NoBreakTableCell,
  DescriptionTableCell,
  ChipsCell,
  StyledChip,
  ActionsCell,
  EditButton,
  DeleteButton,
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
  onDelete: (drug: Drug) => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
}

const CELL_COMPONENTS = {
  name: NoBreakTableCell,
  brand: NoBreakTableCell,
  description: DescriptionTableCell,
} as const;

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
    render: (drug: Drug) => (
      <ChipsCell>
        {drug.indications.map((item) => (
          <StyledChip key={item} label={item} size='small' variant='outlined' />
        ))}
      </ChipsCell>
    ),
  },
  {
    key: 'contraindications',
    label: 'Contraindications',
    render: (drug: Drug) => (
      <ChipsCell>
        {drug.contraindications.map((item) => (
          <StyledChip key={item} label={item} size='small' variant='outlined' />
        ))}
      </ChipsCell>
    ),
  },
  {
    key: 'dosage',
    label: 'Dosage',
    render: (drug: Drug) => drug.dosage,
  },
  {
    key: 'sideEffects',
    label: 'Side effects',
    render: (drug: Drug) => (
      <ChipsCell>
        {drug.sideEffects.map((item) => (
          <StyledChip key={item} label={item} size='small' variant='outlined' />
        ))}
      </ChipsCell>
    ),
  },
  {
    key: 'activeIngredients',
    label: 'Active ingredients',
    render: (drug: Drug) => (
      <ChipsCell>
        {drug.activeIngredients.map((item) => (
          <StyledChip key={item} label={item} size='small' variant='outlined' />
        ))}
      </ChipsCell>
    ),
  },
] as const;

export const DrugsTable = ({
  drugs,
  onEdit,
  onDelete,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
}: DrugsTableProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    if (!hasMore || !onLoadMore) return;

    const container = containerRef.current;
    const sentinel = sentinelRef.current;

    if (!container || !sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      { root: container },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasMore, onLoadMore, drugs.length]);

  return (
    <StyledTableContainer ref={containerRef}>
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
            <StyledTableRow
              key={drug.id}
              onClick={() => onEdit(drug)}
              sx={{ cursor: 'pointer' }}
            >
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
          ))}

          {hasMore && (
            <TableRow ref={sentinelRef}>
              <TableCell
                colSpan={TABLE_COLUMNS.length + 1}
                align='center'
                sx={{ border: 0, py: isLoadingMore ? 2 : 0 }}
              >
                {isLoadingMore && <CircularProgress size={20} />}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};
