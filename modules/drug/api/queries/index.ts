import { gql, TypedDocumentNode } from '@apollo/client';
import type {
  GenerateDrugMutationResponse,
  GenerateDrugMutationVariables,
  CreateDrugMutationResponse,
  CreateDrugMutationVariables,
  GetDrugsQueryResponse,
  GetDrugsQueryVariables,
  UpdateDrugMutationResponse,
  UpdateDrugMutationVariables,
  DeleteDrugMutationResponse,
  DeleteDrugMutationVariables,
} from '../../types';

export const GENERATE_DRUG: TypedDocumentNode<
  GenerateDrugMutationResponse,
  GenerateDrugMutationVariables
> = gql`
  mutation GenerateDrug($input: GenerateDrugInput!) {
    generateDrug(input: $input) {
      name
      brand
      description
      activeIngredients
      dosage
      indications
      contraindications
      sideEffects
    }
  }
`;

export const CREATE_DRUG: TypedDocumentNode<
  CreateDrugMutationResponse,
  CreateDrugMutationVariables
> = gql`
  mutation CreateDrug($input: CreateDrugInput!) {
    createDrug(input: $input) {
      name
      brand
      description
      activeIngredients
      dosage
      indications
      contraindications
      sideEffects
    }
  }
`;

export const GET_DRUGS: TypedDocumentNode<
  GetDrugsQueryResponse,
  GetDrugsQueryVariables
> = gql`
  query GetDrugs($input: GetDrugsInput!) {
    drugs(input: $input) {
      drugs {
        id
        name
        brand
        description
        indications
        contraindications
        dosage
        sideEffects
        activeIngredients
      }
      limit
      offset
      hasMore
    }
  }
`;

export const UPDATE_DRUG: TypedDocumentNode<
  UpdateDrugMutationResponse,
  UpdateDrugMutationVariables
> = gql`
  mutation UpdateDrug($input: UpdateDrugInput!) {
    updateDrug(input: $input) {
      id
      name
      brand
      description
      activeIngredients
      dosage
      indications
      contraindications
      sideEffects
    }
  }
`;

export const DELETE_DRUG: TypedDocumentNode<
  DeleteDrugMutationResponse,
  DeleteDrugMutationVariables
> = gql`
  mutation DeleteDrug($input: DeleteDrugInput!) {
    deleteDrug(input: $input)
  }
`;
