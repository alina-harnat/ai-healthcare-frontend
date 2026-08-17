import { useMutation, useLazyQuery } from '@apollo/client/react';

import {
  GENERATE_DRUG,
  CREATE_DRUG,
  GET_DRUGS,
  UPDATE_DRUG,
  DELETE_DRUG,
} from './queries';

export const drugApi = {
  useGenerateDrugMutation() {
    return useMutation(GENERATE_DRUG);
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
