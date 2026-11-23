'use client';

import { DRUG_LOCALE } from '../../constants';
import { Skeleton, TableBody, TableHead, TableRow } from '@mui/material';
import { useTranslations } from 'next-intl';
import type { Drug } from '../../types';

import { TABLE_COLUMNS } from './drugs-table-columns';
import { DrugsTableRow } from './drugs-table-row';
import {
  StyledTableWrapper,
  StyledTableContainer,
  StyledTable,
  StyledHeaderCell,
  SkeletonCell,
  StyledPaginationWrapper,
  StyledPagination,
} from './drugs-table-styles';

interface DrugsTableProps {
  drugs: Drug[];
  onEdit: (drug: Drug) => void;
  onDelete: (drug: Drug) => void;
  onUploadImage?: (drug: Drug) => void;
  page: number;
  hasMore: boolean;
  loading?: boolean;
  onPageChange: (page: number) => void;
}

const COLUMN_COUNT = TABLE_COLUMNS.length + 1;
const SKELETON_ROW_COUNT = 9;

export const DrugsTable = ({
  drugs,
  onEdit,
  onDelete,
  onUploadImage,
  page,
  hasMore,
  loading = false,
  onPageChange,
}: DrugsTableProps) => {
  const t = useTranslations(DRUG_LOCALE);

  const totalPages = Math.max(page + (hasMore ? 2 : 1), 1);
  const actionsColumnWidth = onUploadImage ? 136 : 88;

  return (
    <StyledTableWrapper>
      <StyledTableContainer>
        <StyledTable stickyHeader>
          <colgroup>
            {TABLE_COLUMNS.map((column) => (
              <col key={column.key} style={{ width: column.width }} />
            ))}
            <col style={{ width: actionsColumnWidth }} />
          </colgroup>

          <TableHead>
            <TableRow>
              {TABLE_COLUMNS.map((column) => (
                <StyledHeaderCell key={column.key}>
                  {t(column.label)}
                </StyledHeaderCell>
              ))}

              <StyledHeaderCell
                align='center'
                sx={{ width: actionsColumnWidth }}
              >
                {t('table.actions')}
              </StyledHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading
              ? Array.from({ length: SKELETON_ROW_COUNT }, (_, rowIndex) => (
                  <TableRow key={`skeleton-${rowIndex}`}>
                    {Array.from({ length: COLUMN_COUNT }, (_, cellIndex) => (
                      <SkeletonCell key={`skeleton-${rowIndex}-${cellIndex}`}>
                        <Skeleton variant='text' width='80%' />
                      </SkeletonCell>
                    ))}
                  </TableRow>
                ))
              : drugs.map((drug) => (
                  <DrugsTableRow
                    key={drug.id}
                    drug={drug}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onUploadImage={onUploadImage}
                  />
                ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>

      <StyledPaginationWrapper>
        <StyledPagination
          count={totalPages}
          page={page + 1}
          onChange={(_event, value) => onPageChange(value - 1)}
          disabled={loading}
          shape='rounded'
          color='primary'
        />
      </StyledPaginationWrapper>
    </StyledTableWrapper>
  );
};
