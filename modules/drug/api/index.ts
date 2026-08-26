import { useMutation, useLazyQuery } from '@apollo/client/react';

import {
  GENERATE_DRUG,
  IDENTIFY_DRUG,
  GENERATE_DRUG_DETAILS,
  CREATE_DRUG,
  GET_DRUGS,
  UPDATE_DRUG,
  DELETE_DRUG,
} from './queries';

export const drugApi = {
  useGenerateDrugMutation() {
    return useMutation(GENERATE_DRUG);
  },

  useIdentifyDrugMutation() {
    return useMutation(IDENTIFY_DRUG);
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
};
