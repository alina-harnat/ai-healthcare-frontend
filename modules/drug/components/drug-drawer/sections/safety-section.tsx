'use client';
import { DRUG_LOCALE } from '../../../constants';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';

import type { DrugFormValues } from '../../../schemas';
import { ChipArrayField } from '../chip-array-field';
import { Section, SectionHeader, SectionTitle } from '../drug-drawer-styles';

export const SafetySection = () => {
  const { t } = useTranslation(DRUG_LOCALE);

  const {
    control,
    formState: { errors },
  } = useFormContext<DrugFormValues>();

  return (
    <Section>
      <SectionHeader>
        <HealthAndSafetyOutlinedIcon />
        <SectionTitle>{t('drawer.safety')}</SectionTitle>
      </SectionHeader>

      <Controller
        name='contraindications'
        control={control}
        render={({ field }) => (
          <ChipArrayField
            label={t('drawer.contraindications')}
            placeholder={t('drawer.addContraindication')}
            values={field.value}
            onChange={field.onChange}
            error={
              errors.contraindications
                ? t('drawer.contraindicationsRequired')
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
            label={t('drawer.sideEffects')}
            placeholder={t('drawer.addSideEffect')}
            values={field.value}
            onChange={field.onChange}
            error={
              errors.sideEffects ? t('drawer.sideEffectsRequired') : undefined
            }
          />
        )}
      />
    </Section>
  );
};
