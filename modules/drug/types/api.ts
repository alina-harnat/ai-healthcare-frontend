import type { Drug } from '../types';

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

export interface GenerateDrugMutationResponse {
  generateDrug: Omit<Drug, 'id'>;
}

export interface GenerateDrugMutationVariables {
  input: { input: string };
}
