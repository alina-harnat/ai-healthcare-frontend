'use client';

import { Controller, useFormContext } from 'react-hook-form';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';

import type { DrugFormValues } from '../../../schemas';
import { ChipArrayField } from '../chip-array-field';
import {
  Section,
  SectionHeader,
  SectionTitle,
  FieldGroup,
  Label,
  StyledTextField,
} from '../drug-drawer-styles';

export const UsageSection = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<DrugFormValues>();

  return (
    <Section>
      <SectionHeader>
        <MedicationOutlinedIcon />
        <SectionTitle>Usage</SectionTitle>
      </SectionHeader>

      <Controller
        name='indications'
        control={control}
        render={({ field }) => (
          <ChipArrayField
            label='Indications'
            placeholder='Add indication'
            values={field.value}
            onChange={field.onChange}
            error={
              errors.indications
                ? 'At least one indication is required'
                : undefined
            }
          />
        )}
      />

      <FieldGroup>
        <Label htmlFor='dosage'>Dosage</Label>

        <StyledTextField
          id='dosage'
          size='small'
          error={!!errors.dosage}
          helperText={errors.dosage ? 'Dosage is required' : undefined}
          {...register('dosage')}
        />
      </FieldGroup>
    </Section>
  );
};
