import {
  NoBreakTableCell,
  DescriptionTableCell,
  ChipsCell,
  StyledChip,
} from './drugs-table-styles';
import type { Drug } from '../../types';

export const CELL_COMPONENTS = {
  name: NoBreakTableCell,
  brand: NoBreakTableCell,
  description: DescriptionTableCell,
} as const;

const renderChips = (items: string[]) => (
  <ChipsCell>
    {items.map((item) => (
      <StyledChip key={item} label={item} size='small' variant='outlined' />
    ))}
  </ChipsCell>
);

export const TABLE_COLUMNS = [
  {
    key: 'name',
    label: 'table.name',
    render: (drug: Drug) => drug.name,
  },
  {
    key: 'brand',
    label: 'table.brand',
    render: (drug: Drug) => drug.brand,
  },
  {
    key: 'description',
    label: 'table.description',
    render: (drug: Drug) => drug.description,
  },
  {
    key: 'indications',
    label: 'table.indications',
    render: (drug: Drug) => renderChips(drug.indications),
  },
  {
    key: 'contraindications',
    label: 'table.contraindications',
    render: (drug: Drug) => renderChips(drug.contraindications),
  },
  {
    key: 'dosage',
    label: 'table.dosage',
    render: (drug: Drug) => drug.dosage,
  },
  {
    key: 'sideEffects',
    label: 'table.sideEffects',
    render: (drug: Drug) => renderChips(drug.sideEffects),
  },
  {
    key: 'activeIngredients',
    label: 'table.activeIngredients',
    render: (drug: Drug) => renderChips(drug.activeIngredients),
  },
] as const;
