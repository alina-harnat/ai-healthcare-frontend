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
  createDrug: Drug;
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

export interface IdentifiedDrug {
  name: string;
  brand: string;
}

export interface IdentifyDrugMutationResponse {
  identifyDrug: IdentifiedDrug;
}

export interface IdentifyDrugMutationVariables {
  input: {
    input: string;
  };
}

export type MimeType = 'Jpeg' | 'Png' | 'Webp';

export interface DrugRecognition {
  medicine_name: string | null;
  dosage: string | null;
  active_ingredients: string[];
  manufacturer: string | null;
}

export interface DrugRecognitionMutationResponse {
  recognizeDrug: DrugRecognition;
}

export interface DrugRecognitionMutationVariables {
  input: {
    image: string;
    mimeType: MimeType;
  };
}

export interface BoundingBox {
  yMin: number;
  xMin: number;
  yMax: number;
  xMax: number;
}

export interface DetectedObject {
  label: string;
  boundingBox: BoundingBox;
}

export interface DetectObjectsMutationResponse {
  detectObjects: {
    objects: DetectedObject[];
  };
}

export interface DetectObjectsMutationVariables {
  input: {
    image: string;
    mimeType: MimeType;
  };
}

export interface DrugImageDrug {
  id: string;
  name: string;
  brand: string;
  description: string;
  dosage: string;
  activeIngredients: string[];
}

export interface SimilarDrugImage {
  id: string;
  drugId: string;
  imageUrl: string;
  mimeType: string;
  createdAt: string;
  similarityScore: number;
  drug: DrugImageDrug;
}

export interface SearchSimilarDrugImagesQueryResponse {
  searchSimilarDrugImages: {
    images: SimilarDrugImage[];
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface SearchSimilarDrugImagesQueryVariables {
  input: {
    image: string;
    mimeType: MimeType;
    limit?: number;
    offset?: number;
    minSimilarityScore?: number;
  };
}

export interface DrugImage {
  id: string;
  drugId: string;
  imageUrl: string;
  mimeType: string;
  createdAt: string;
  drug: DrugImageDrug;
}

export interface UploadDrugImageMutationResponse {
  uploadDrugImage: DrugImage;
}

export interface UploadDrugImageMutationVariables {
  input: {
    drugId: string;
    image: string;
    mimeType: MimeType;
  };
}

export interface GenerateDrugDetailsMutationResponse {
  generateDrugDetails: Omit<Drug, 'id'>;
}

export interface GenerateDrugDetailsMutationVariables {
  input: IdentifiedDrug;
}
