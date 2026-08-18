'use client';
import { DRUG_LOCALE } from '../../../constants';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import type { DrugFormValues } from '../../../schemas';
import {
  Section,
  SectionHeader,
  SectionTitle,
  FieldGroup,
  Label,
  StyledTextField,
} from '../drug-drawer-styles';

export const GeneralInfoSection = () => {
  const { t } = useTranslation(DRUG_LOCALE);

  const {
    register,
    formState: { errors },
  } = useFormContext<DrugFormValues>();

  return (
    <Section>
      <SectionHeader>
        <InfoOutlinedIcon />
        <SectionTitle>{t('drawer.generalInformation')}</SectionTitle>
      </SectionHeader>

      <FieldGroup>
        <Label htmlFor='name'>{t('drawer.name')}</Label>

        <StyledTextField
          id='name'
          size='small'
          error={!!errors.name}
          helperText={errors.name ? t('validation.nameRequired') : undefined}
          {...register('name')}
        />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor='brand'>{t('drawer.brand')}</Label>

        <StyledTextField
          id='brand'
          size='small'
          error={!!errors.brand}
          helperText={errors.brand ? t('validation.brandRequired') : undefined}
          {...register('brand')}
        />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor='description'>{t('drawer.description')}</Label>

        <StyledTextField
          id='description'
          size='small'
          multiline
          minRows={3}
          error={!!errors.description}
          helperText={
            errors.description ? t('validation.descriptionRequired') : undefined
          }
          {...register('description')}
        />
      </FieldGroup>
    </Section>
  );
};
