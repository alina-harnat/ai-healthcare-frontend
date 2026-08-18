'use client';
import { DRUG_LOCALE } from '../../../constants';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';

import type { DrugFormValues } from '../../../schemas';
import { ChipArrayField } from '../chip-array-field';
import { Section, SectionHeader, SectionTitle } from '../drug-drawer-styles';

export const IngredientsSection = () => {
  const { t } = useTranslation(DRUG_LOCALE);

  const {
    control,
    formState: { errors },
  } = useFormContext<DrugFormValues>();

  return (
    <Section>
      <SectionHeader>
        <ScienceOutlinedIcon />
        <SectionTitle>{t('drawer.ingredients')}</SectionTitle>
      </SectionHeader>

      <Controller
        name='activeIngredients'
        control={control}
        render={({ field }) => (
          <ChipArrayField
            label={t('drawer.activeIngredients')}
            placeholder={t('drawer.addActiveIngredient')}
            values={field.value}
            onChange={field.onChange}
            error={
              errors.activeIngredients
                ? t('drawer.activeIngredientsRequired')
                : undefined
            }
          />
        )}
      />
    </Section>
  );
};
