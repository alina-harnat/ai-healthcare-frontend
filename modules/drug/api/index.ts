import { useMutation, useLazyQuery } from '@apollo/client/react';

import {
  GENERATE_DRUG,
  CREATE_DRUG,
  GET_DRUGS,
  UPDATE_DRUG,
  DELETE_DRUG,
} from './constants';

import type { Drug } from '../components';

export interface GetDrugsQueryResponse {
  drugs: {
    drugs: Drug[];
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface GetDrugsQueryVariables {
  input: {
    limit: number;
    offset: number;
    search?: {
      searchText?: string;
    };
  };
}

export interface DrugInput {
  name: string;
  brand: string;
  description: string;
  dosage: string;
  activeIngredients: string[];
  indications: string[];
  contraindications: string[];
  sideEffects: string[];
}

export interface CreateDrugMutationResponse {
  createDrug: Omit<Drug, 'id'>;
}

export interface CreateDrugMutationVariables {
  input: DrugInput;
}

export interface UpdateDrugMutationResponse {
  updateDrug: Drug;
}

export interface UpdateDrugMutationVariables {
  input: Partial<DrugInput> & { id: string };
}

export interface DeleteDrugMutationResponse {
  deleteDrug: boolean;
}

export interface DeleteDrugMutationVariables {
  input: { id: string };
}

export const drugApi = {
  useGenerateDrugMutation() {
    return useMutation(GENERATE_DRUG);
  },

  useCreateDrugMutation() {
    return useMutation<CreateDrugMutationResponse, CreateDrugMutationVariables>(
      CREATE_DRUG,
    );
  },

  useUpdateDrugMutation() {
    return useMutation<UpdateDrugMutationResponse, UpdateDrugMutationVariables>(
      UPDATE_DRUG,
    );
  },

  useDeleteDrugMutation() {
    return useMutation<DeleteDrugMutationResponse, DeleteDrugMutationVariables>(
      DELETE_DRUG,
    );
  },

  useGetDrugsLazyQuery() {
    return useLazyQuery<GetDrugsQueryResponse, GetDrugsQueryVariables>(
      GET_DRUGS,
    );
  },
};
