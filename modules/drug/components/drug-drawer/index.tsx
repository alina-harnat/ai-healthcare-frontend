'use client';

import { useEffect, useState, type KeyboardEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormHelperText, IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';

import { drugApi } from '../../api';
import { drugSchema, type DrugFormValues } from '../../schemas';
import type { Drug } from '../drugs-table';
import { StyledChip } from '../drugs-table/drugs-table-styles';
import {
  StyledDrawer,
  DrawerHeader,
  DrawerTitle,
  CloseButton,
  DrawerBody,
  Section,
  SectionHeader,
  SectionTitle,
  FieldGroup,
  Label,
  StyledTextField,
  ChipInputRow,
  ChipsWrap,
  ErrorContainer,
  DrawerFooter,
  CancelButton,
  SubmitButton,
} from './drug-drawer-styles';

const EMPTY_VALUES: DrugFormValues = {
  name: '',
  brand: '',
  description: '',
  dosage: '',
  indications: [],
  contraindications: [],
  sideEffects: [],
  activeIngredients: [],
};

interface ChipArrayFieldProps {
  label: string;
  placeholder?: string;
  values: string[];
  onChange: (values: string[]) => void;
  error?: string;
}

const ChipArrayField = ({
  label,
  placeholder,
  values,
  onChange,
  error,
}: ChipArrayFieldProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const trimmed = inputValue.trim();

    if (!trimmed || values.includes(trimmed)) {
      return;
    }

    onChange([...values, trimmed]);
    setInputValue('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAdd();
    }
  };

  const handleDelete = (item: string) => {
    onChange(values.filter((value) => value !== item));
  };

  return (
    <FieldGroup>
      <Label>{label}</Label>

      <ChipInputRow>
        <StyledTextField
          size='small'
          fullWidth
          placeholder={placeholder}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
        />

        <IconButton size='small' color='primary' onClick={handleAdd}>
          <AddIcon fontSize='small' />
        </IconButton>
      </ChipInputRow>

      <ChipsWrap>
        {values.map((item) => (
          <StyledChip
            key={item}
            label={item}
            size='small'
            variant='outlined'
            onDelete={() => handleDelete(item)}
          />
        ))}
      </ChipsWrap>

      {error && <FormHelperText error>{error}</FormHelperText>}
    </FieldGroup>
  );
};

interface DrugDrawerProps {
  open: boolean;
  drug?: Drug | null;
  onClose: () => void;
  onCreated: () => void;
  onUpdated: (drug: Drug) => void;
}

export const DrugDrawer = ({
  open,
  drug,
  onClose,
  onCreated,
  onUpdated,
}: DrugDrawerProps) => {
  const isEditMode = !!drug;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DrugFormValues>({
    resolver: zodResolver(drugSchema),
    defaultValues: EMPTY_VALUES,
  });

  const [createDrug, { loading: creating, error: createError }] =
    drugApi.useCreateDrugMutation();
  const [updateDrug, { loading: updating, error: updateError }] =
    drugApi.useUpdateDrugMutation();

  const loading = creating || updating;
  const error = createError ?? updateError;

  useEffect(() => {
    if (!open) {
      return;
    }

    reset(
      drug
        ? {
            name: drug.name,
            brand: drug.brand,
            description: drug.description,
            dosage: drug.dosage,
            indications: drug.indications,
            contraindications: drug.contraindications,
            sideEffects: drug.sideEffects,
            activeIngredients: drug.activeIngredients,
          }
        : EMPTY_VALUES,
    );
  }, [open, drug, reset]);

  const onSubmit = async (values: DrugFormValues) => {
    if (isEditMode && drug) {
      const { data } = await updateDrug({
        variables: { input: { id: drug.id, ...values } },
      });

      if (data?.updateDrug) {
        onUpdated(data.updateDrug);
        onClose();
      }

      return;
    }

    const { data } = await createDrug({ variables: { input: values } });

    if (data?.createDrug) {
      onCreated();
      onClose();
    }
  };

  return (
    <StyledDrawer anchor='right' open={open} onClose={onClose}>
      <DrawerHeader>
        <DrawerTitle>{isEditMode ? 'Edit drug' : 'Add drug'}</DrawerTitle>

        <CloseButton size='small' onClick={onClose}>
          <CloseIcon fontSize='small' />
        </CloseButton>
      </DrawerHeader>

      <DrawerBody onSubmit={handleSubmit(onSubmit)}>
        <ErrorContainer role='alert'>{error?.message ?? ''}</ErrorContainer>

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
      </DrawerBody>

      <DrawerFooter>
        <CancelButton onClick={onClose} disabled={loading}>
          Cancel
        </CancelButton>

        <SubmitButton
          variant='contained'
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
        >
          {isEditMode ? 'Save' : 'Create'}
        </SubmitButton>
      </DrawerFooter>
    </StyledDrawer>
  );
};
