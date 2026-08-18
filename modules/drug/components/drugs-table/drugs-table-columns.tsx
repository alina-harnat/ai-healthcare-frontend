import { Tooltip } from '@mui/material';

import { TruncatedText } from './drugs-table-styles';
import { ChipList } from './chip-list';
import type { Drug } from '../../types';

const renderText = (value: string) => (
  <Tooltip title={value}>
    <TruncatedText>{value}</TruncatedText>
  </Tooltip>
);

const renderChips = (items: string[]) => <ChipList items={items} />;

export const TABLE_COLUMNS = [
  {
    key: 'name',
    label: 'table.name',
    width: '11%',
    render: (drug: Drug) => renderText(drug.name),
  },
  {
    key: 'brand',
    label: 'table.brand',
    width: '11%',
    render: (drug: Drug) => renderText(drug.brand),
  },
  {
    key: 'description',
    label: 'table.description',
    width: '18%',
    render: (drug: Drug) => renderText(drug.description),
  },
  {
    key: 'indications',
    label: 'table.indications',
    width: '13%',
    render: (drug: Drug) => renderChips(drug.indications),
  },
  {
    key: 'contraindications',
    label: 'table.contraindications',
    width: '13%',
    render: (drug: Drug) => renderChips(drug.contraindications),
  },
  {
    key: 'dosage',
    label: 'table.dosage',
    width: '9%',
    render: (drug: Drug) => renderText(drug.dosage),
  },
  {
    key: 'sideEffects',
    label: 'table.sideEffects',
    width: '13%',
    render: (drug: Drug) => renderChips(drug.sideEffects),
  },
  {
    key: 'activeIngredients',
    label: 'table.activeIngredients',
    width: '13%',
    render: (drug: Drug) => renderChips(drug.activeIngredients),
  },
] as const;
