'use client';

import { Controller, useFormContext } from 'react-hook-form';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';

import type { DrugFormValues } from '../../../schemas';
import { ChipArrayField } from '../chip-array-field';
import { Section, SectionHeader, SectionTitle } from '../drug-drawer-styles';

export const IngredientsSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<DrugFormValues>();

  return (
    <Section>
      <SectionHeader>
        <ScienceOutlinedIcon />
        <SectionTitle>Ingredients</SectionTitle>
      </SectionHeader>

      <Controller
        name='activeIngredients'
        control={control}
        render={({ field }) => (
          <ChipArrayField
            label='Active ingredients'
            placeholder='Add active ingredient'
            values={field.value}
            onChange={field.onChange}
            error={
              errors.activeIngredients
                ? 'At least one active ingredient is required'
                : undefined
            }
          />
        )}
      />
    </Section>
  );
};
