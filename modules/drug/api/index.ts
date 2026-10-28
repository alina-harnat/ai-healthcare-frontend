import { useMutation, useLazyQuery } from '@apollo/client/react';

import {
  GENERATE_DRUG,
  IDENTIFY_DRUG,
  RECOGNIZE_DRUG,
  GENERATE_DRUG_DETAILS,
  CREATE_DRUG,
  GET_DRUGS,
  UPDATE_DRUG,
  DELETE_DRUG,
  DETECT_OBJECTS,
  SEARCH_SIMILAR_DRUG_IMAGES,
  UPLOAD_DRUG_IMAGE,
} from './queries';

export const drugApi = {
  useGenerateDrugMutation() {
    return useMutation(GENERATE_DRUG);
  },

  useIdentifyDrugMutation() {
    return useMutation(IDENTIFY_DRUG);
  },

  useRecognizeDrugMutation() {
    return useMutation(RECOGNIZE_DRUG);
  },

  useGenerateDrugDetailsMutation() {
    return useMutation(GENERATE_DRUG_DETAILS);
  },

  useCreateDrugMutation() {
    return useMutation(CREATE_DRUG);
  },

  useUpdateDrugMutation() {
    return useMutation(UPDATE_DRUG);
  },

  useDeleteDrugMutation() {
    return useMutation(DELETE_DRUG);
  },

  useGetDrugsLazyQuery() {
    return useLazyQuery(GET_DRUGS);
  },

  useDetectObjectsMutation() {
    return useMutation(DETECT_OBJECTS);
  },

  useUploadDrugImageMutation() {
    return useMutation(UPLOAD_DRUG_IMAGE);
  },

  useSearchSimilarDrugImagesLazyQuery() {
    return useLazyQuery(SEARCH_SIMILAR_DRUG_IMAGES, {
      fetchPolicy: 'no-cache',
    });
  },
};
