'use client';

import { useFormContext } from 'react-hook-form';
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
  const {
    register,
    formState: { errors },
  } = useFormContext<DrugFormValues>();

  return (
    <Section>
      <SectionHeader>
        <InfoOutlinedIcon />
        <SectionTitle>General information</SectionTitle>
      </SectionHeader>

      <FieldGroup>
        <Label htmlFor='name'>Name</Label>

        <StyledTextField
          id='name'
          size='small'
          error={!!errors.name}
          helperText={errors.name ? 'Name is required' : undefined}
          {...register('name')}
        />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor='brand'>Brand</Label>

        <StyledTextField
          id='brand'
          size='small'
          error={!!errors.brand}
          helperText={errors.brand ? 'Brand is required' : undefined}
          {...register('brand')}
        />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor='description'>Description</Label>

        <StyledTextField
          id='description'
          size='small'
          multiline
          minRows={3}
          error={!!errors.description}
          helperText={
            errors.description ? 'Description is required' : undefined
          }
          {...register('description')}
        />
      </FieldGroup>
    </Section>
  );
};
