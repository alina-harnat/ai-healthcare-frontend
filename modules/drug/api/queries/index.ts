import { gql, TypedDocumentNode } from '@apollo/client';
import type {
  GenerateDrugMutationResponse,
  GenerateDrugMutationVariables,
  IdentifyDrugMutationResponse,
  IdentifyDrugMutationVariables,
  DrugRecognitionMutationResponse,
  DrugRecognitionMutationVariables,
  GenerateDrugDetailsMutationResponse,
  GenerateDrugDetailsMutationVariables,
  CreateDrugMutationResponse,
  CreateDrugMutationVariables,
  GetDrugsQueryResponse,
  GetDrugsQueryVariables,
  UpdateDrugMutationResponse,
  UpdateDrugMutationVariables,
  DeleteDrugMutationResponse,
  DeleteDrugMutationVariables,
  DetectObjectsMutationResponse,
  DetectObjectsMutationVariables,
  SearchSimilarDrugImagesQueryResponse,
  SearchSimilarDrugImagesQueryVariables,
} from '../../types';

export const DETECT_OBJECTS: TypedDocumentNode<
  DetectObjectsMutationResponse,
  DetectObjectsMutationVariables
> = gql`
  mutation DetectObjects($input: ObjectDetectionInput!) {
    detectObjects(input: $input) {
      objects {
        label
        boundingBox {
          yMin
          xMin
          yMax
          xMax
        }
      }
    }
  }
`;

export const SEARCH_SIMILAR_DRUG_IMAGES: TypedDocumentNode<
  SearchSimilarDrugImagesQueryResponse,
  SearchSimilarDrugImagesQueryVariables
> = gql`
  query SearchSimilarDrugImages($input: DrugImageSearchInput!) {
    searchSimilarDrugImages(input: $input) {
      images {
        id
        drugId
        imageUrl
        mimeType
        createdAt
        similarityScore
        drug {
          id
          name
          brand
          description
          dosage
          activeIngredients
        }
      }
      limit
      offset
      hasMore
    }
  }
`;

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

export const IDENTIFY_DRUG: TypedDocumentNode<
  IdentifyDrugMutationResponse,
  IdentifyDrugMutationVariables
> = gql`
  mutation IdentifyDrug($input: GenerateDrugInput!) {
    identifyDrug(input: $input) {
      name
      brand
    }
  }
`;

export const RECOGNIZE_DRUG: TypedDocumentNode<
  DrugRecognitionMutationResponse,
  DrugRecognitionMutationVariables
> = gql`
  mutation RecognizeDrug($input: DrugRecognitionInput!) {
    recognizeDrug(input: $input) {
      medicine_name
      dosage
      active_ingredients
      manufacturer
    }
  }
`;

export const GENERATE_DRUG_DETAILS: TypedDocumentNode<
  GenerateDrugDetailsMutationResponse,
  GenerateDrugDetailsMutationVariables
> = gql`
  mutation GenerateDrugDetails($input: GenerateDrugDetailsInput!) {
    generateDrugDetails(input: $input) {
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
