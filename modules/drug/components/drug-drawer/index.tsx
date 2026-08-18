'use client';
import { DRUG_LOCALE } from '../../constants';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';

import type { Drug } from '../../types';
import { DrugFormSkeleton } from '../drug-form skeleton';
import { DrugAiGenerator } from '../ai-drug-generator';
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
  ErrorContainer,
  DrawerFooter,
  CancelButton,
  SubmitButton,
} from './drug-drawer-styles';

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
  const { t } = useTranslation(DRUG_LOCALE);

  const {
    form,
    isEditMode,
    loading,
    generating,
    error,
    generateError,
    handleGenerate,
    onSubmit,
  } = useDrugForm({
    open,
    drug,
    onClose,
    onCreated,
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
          <ErrorContainer role='alert'>{error?.message ?? ''}</ErrorContainer>

          {!isEditMode && (
            <DrugAiGenerator
              generating={generating}
              error={generateError?.message}
              onGenerate={handleGenerate}
            />
          )}

          {generating ? (
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
        <CancelButton onClick={onClose} disabled={loading || generating}>
          {t('page.cancel')}
        </CancelButton>

        <SubmitButton
          variant='contained'
          disabled={loading || generating}
          onClick={onSubmit}
        >
          {isEditMode ? t('drawer.save') : t('drawer.create')}
        </SubmitButton>
      </DrawerFooter>
    </StyledDrawer>
  );
};
