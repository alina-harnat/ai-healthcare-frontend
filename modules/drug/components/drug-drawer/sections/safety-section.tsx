'use client';

import { Controller, useFormContext } from 'react-hook-form';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';

import type { DrugFormValues } from '../../../schemas';
import { ChipArrayField } from '../chip-array-field';
import { Section, SectionHeader, SectionTitle } from '../drug-drawer-styles';

export const SafetySection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<DrugFormValues>();

  return (
    <Section>
      <SectionHeader>
        <HealthAndSafetyOutlinedIcon />
        <SectionTitle>Safety</SectionTitle>
      </SectionHeader>

      <Controller
        name='contraindications'
        control={control}
        render={({ field }) => (
          <ChipArrayField
            label='Contraindications'
            placeholder='Add contraindication'
            values={field.value}
            onChange={field.onChange}
            error={
              errors.contraindications
                ? 'At least one contraindication is required'
                : undefined
            }
          />
        )}
      />

      <Controller
        name='sideEffects'
        control={control}
        render={({ field }) => (
          <ChipArrayField
            label='Side effects'
            placeholder='Add side effect'
            values={field.value}
            onChange={field.onChange}
            error={
              errors.sideEffects
                ? 'At least one side effect is required'
                : undefined
            }
          />
        )}
      />
    </Section>
  );
};
