'use client';
import { DRUG_LOCALE } from '../../../constants';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation(DRUG_LOCALE);

  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<DrugFormValues>();

  return (
    <Section>
      <SectionHeader>
        <MedicationOutlinedIcon />
        <SectionTitle>{t('drawer.usage')}</SectionTitle>
      </SectionHeader>

      <Controller
        name='indications'
        control={control}
        render={({ field }) => (
          <ChipArrayField
            label={t('drawer.indications')}
            placeholder={t('drawer.addIndication')}
            values={field.value}
            onChange={field.onChange}
            error={
              errors.indications ? t('drawer.indicationsRequired') : undefined
            }
          />
        )}
      />

      <FieldGroup>
        <Label htmlFor='dosage'>{t('drawer.dosage')}</Label>

        <StyledTextField
          id='dosage'
          size='small'
          error={!!errors.dosage}
          helperText={
            errors.dosage ? t('validation.dosageRequired') : undefined
          }
          {...register('dosage')}
        />
      </FieldGroup>
    </Section>
  );
};
