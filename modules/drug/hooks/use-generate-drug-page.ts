import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { drugApi } from '../api';
import { drugSchema, type DrugFormValues } from '../schemas';
import type { IdentifiedDrug } from '../types';

export enum GenerateDrugStep {
  Prompt = 'prompt',
  ConfirmIdentity = 'confirm-identity',
  ReviewDetails = 'review-details',
}

export const useGenerateDrugPage = () => {
  const router = useRouter();

  const [step, setStep] = useState<GenerateDrugStep>(GenerateDrugStep.Prompt);
  const [prompt, setPrompt] = useState('');
  const [identifiedDrug, setIdentifiedDrug] = useState<IdentifiedDrug | null>(
    null,
  );

  const form = useForm<DrugFormValues>({
    resolver: zodResolver(drugSchema),
  });

  const [identifyDrug, { loading: identifying, error: identifyError }] =
    drugApi.useIdentifyDrugMutation();

  const [
    generateDrugDetails,
    { loading: generatingDetails, error: generateDetailsError },
  ] = drugApi.useGenerateDrugDetailsMutation();

  const [createDrug, { loading: creating, error: createError }] =
    drugApi.useCreateDrugMutation();

  const handleIdentify = async () => {
    const trimmed = prompt.trim();

    if (!trimmed || identifying) {
      return;
    }

    const { data } = await identifyDrug({
      variables: {
        input: {
          input: trimmed,
        },
      },
    });

    if (data?.identifyDrug) {
      setIdentifiedDrug({
        name: data.identifyDrug.name,
        brand: data.identifyDrug.brand,
      });
      setStep(GenerateDrugStep.ConfirmIdentity);
    }
  };

  const handleEditPrompt = () => {
    setIdentifiedDrug(null);
    setStep(GenerateDrugStep.Prompt);
  };

  const handleConfirmIdentity = async () => {
    if (!identifiedDrug || generatingDetails) {
      return;
    }

    const { data } = await generateDrugDetails({
      variables: {
        input: {
          name: identifiedDrug.name,
          brand: identifiedDrug.brand,
        },
      },
    });

    if (data?.generateDrugDetails) {
      form.reset(data.generateDrugDetails);
      setStep(GenerateDrugStep.ReviewDetails);
    }
  };

  const handleCreate = form.handleSubmit(async (values) => {
    const { data } = await createDrug({
      variables: {
        input: values,
      },
    });

    if (data?.createDrug) {
      router.push('/drugs');
    }
  });

  return {
    step,
    prompt,
    setPrompt,
    identifiedDrug,
    form,
    identifying,
    identifyError,
    generatingDetails,
    generateDetailsError,
    creating,
    createError,
    handleIdentify,
    handleEditPrompt,
    handleConfirmIdentity,
    handleCreate,
  };
};
