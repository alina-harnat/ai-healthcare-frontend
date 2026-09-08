import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { drugApi } from '../api';
import { drugSchema, type DrugFormValues } from '../schemas';
import type { Drug } from '../types';

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

interface UseDrugFormProps {
  open: boolean;
  drug?: Drug | null;
  onClose: () => void;
  onCreate: (values: DrugFormValues) => void;
  onCreated: (drug: Drug) => void;
  onCreateError: () => void;
  onUpdated: (drug: Drug) => void;
}

export const useDrugForm = ({
  open,
  drug,
  onClose,
  onCreate,
  onCreated,
  onCreateError,
  onUpdated,
}: UseDrugFormProps) => {
  const isEditMode = !!drug;

  const form = useForm<DrugFormValues>({
    resolver: zodResolver(drugSchema),
    defaultValues: EMPTY_VALUES,
  });

  const { reset, handleSubmit } = form;

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
        variables: {
          input: {
            id: drug.id,
            ...values,
          },
        },
      });

      if (data?.updateDrug) {
        onUpdated(data.updateDrug);
        onClose();
      }

      return;
    }

    onCreate(values);
    onClose();

    try {
      const { data } = await createDrug({
        variables: {
          input: values,
        },
      });

      if (data?.createDrug) {
        onCreated(data.createDrug);
      } else {
        onCreateError();
      }
    } catch {
      onCreateError();
    }
  };

  return {
    form,
    isEditMode,
    loading,
    error,
    onSubmit: handleSubmit(onSubmit),
  };
};
