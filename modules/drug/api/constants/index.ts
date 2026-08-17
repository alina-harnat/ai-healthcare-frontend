import { gql } from '@apollo/client';

export const GENERATE_DRUG = gql`
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

export const CREATE_DRUG = gql`
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

export const GET_DRUGS = gql`
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

export const UPDATE_DRUG = gql`
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

export const DELETE_DRUG = gql`
  mutation DeleteDrug($input: DeleteDrugInput!) {
    deleteDrug(input: $input)
  }
`;
