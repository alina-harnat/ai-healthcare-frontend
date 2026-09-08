'use client';
import { DRUG_LOCALE } from '../../constants';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';

import type { Drug } from '../../types';
import type { DrugFormValues } from '../../schemas';
import { DrugFormSkeleton } from '../drug-form skeleton';
import { useDrugForm } from '../../hooks';
import {
  GeneralInfoSection,
  UsageSection,
  SafetySection,
  IngredientsSection,
} from '../drug-drawer/sections';
import {
  StyledDrawer,
  DrawerHeader,
  DrawerTitle,
  CloseButton,
  DrawerBody,
  DrawerFooter,
  CancelButton,
  SubmitButton,
} from './drug-drawer-styles';

interface DrugDrawerProps {
  open: boolean;
  drug?: Drug | null;
  onClose: () => void;
  onCreate: (values: DrugFormValues) => void;
  onCreated: (drug: Drug) => void;
  onCreateError: () => void;
  onUpdated: (drug: Drug) => void;
}

export const DrugDrawer = ({
  open,
  drug,
  onClose,
  onCreate,
  onCreated,
  onCreateError,
  onUpdated,
}: DrugDrawerProps) => {
  const { t } = useTranslation(DRUG_LOCALE);

  const { form, isEditMode, loading, onSubmit } = useDrugForm({
    open,
    drug,
    onClose,
    onCreate,
    onCreated,
    onCreateError,
    onUpdated,
  });

  return (
    <StyledDrawer anchor='right' open={open} onClose={onClose}>
      <DrawerHeader>
        <DrawerTitle>
          {isEditMode ? t('drawer.editTitle') : t('drawer.addTitle')}
        </DrawerTitle>

        <CloseButton size='small' onClick={onClose}>
          <CloseIcon fontSize='small' />
        </CloseButton>
      </DrawerHeader>

      <FormProvider {...form}>
        <DrawerBody onSubmit={onSubmit}>
          {loading ? (
            <DrugFormSkeleton />
          ) : (
            <>
              <GeneralInfoSection />
              <UsageSection />
              <SafetySection />
              <IngredientsSection />
            </>
          )}
        </DrawerBody>
      </FormProvider>

      <DrawerFooter>
        <CancelButton onClick={onClose} disabled={loading}>
          {t('page.cancel')}
        </CancelButton>

        <SubmitButton variant='contained' disabled={loading} onClick={onSubmit}>
          {isEditMode ? t('drawer.save') : t('drawer.create')}
        </SubmitButton>
      </DrawerFooter>
    </StyledDrawer>
  );
};
