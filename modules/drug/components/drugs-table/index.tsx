'use client';
import { DRUG_LOCALE } from '../../constants';
import {
  CircularProgress,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import { useInfiniteScroll } from '../../hooks';
import { TABLE_COLUMNS } from './drugs-table-columns';
import { DrugsTableRow } from './drugs-table-row';
import {
  StyledTableContainer,
  StyledTable,
  StyledHeaderCell,
} from './drugs-table-styles';
import { useTranslation } from 'react-i18next';
import type { Drug } from '../../types';

interface DrugsTableProps {
  drugs: Drug[];
  onEdit: (drug: Drug) => void;
  onDelete: (drug: Drug) => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
}

export const DrugsTable = ({
  drugs,
  onEdit,
  onDelete,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
}: DrugsTableProps) => {
  const { t } = useTranslation(DRUG_LOCALE);

  const { containerRef, sentinelRef } = useInfiniteScroll(
    hasMore,
    drugs.length,
    onLoadMore,
  );

  return (
    <StyledTableContainer ref={containerRef}>
      <StyledTable stickyHeader>
        <colgroup>
          {TABLE_COLUMNS.map((column) => (
            <col key={column.key} style={{ width: column.width }} />
          ))}
          <col style={{ width: 88 }} />
        </colgroup>

        <TableHead>
          <TableRow>
            {TABLE_COLUMNS.map((column) => (
              <StyledHeaderCell key={column.key}>
                {t(column.label)}
              </StyledHeaderCell>
            ))}

            <StyledHeaderCell align='center'>
              {t('table.actions')}
            </StyledHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {drugs.map((drug) => (
            <DrugsTableRow
              key={drug.id}
              drug={drug}
              onEdit={onEdit}
              onDelete={onDelete}
            />
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
