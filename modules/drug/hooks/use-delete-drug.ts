import { useState } from 'react';

import { drugApi } from '../api';
import { type Drug } from '../types';

export const useDeleteDrug = (onDeleted: (drugId: string) => void) => {
  const [deletingDrug, setDeletingDrug] = useState<Drug | null>(null);

  const [deleteDrugFn, { loading: deleting, error: deleteError }] =
    drugApi.useDeleteDrugMutation();

  const handleDeleteDrug = (drug: Drug) => {
    setDeletingDrug(drug);
  };

  const handleDeleteCancel = () => {
    setDeletingDrug(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingDrug) {
      return;
    }

    const { data } = await deleteDrugFn({
      variables: { input: { id: deletingDrug.id } },
    });

    if (data?.deleteDrug) {
      onDeleted(deletingDrug.id);
      setDeletingDrug(null);
    }
  };

  return {
    deletingDrug,
    deleting,
    deleteError,
    handleDeleteDrug,
    handleDeleteCancel,
    handleDeleteConfirm,
  };
};
