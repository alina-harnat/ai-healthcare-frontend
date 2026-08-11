import { useMutation, useLazyQuery } from '@apollo/client/react';

import { GENERATE_DRUG, CREATE_DRUG, GET_DRUGS } from './constants';

export const drugApi = {
  useGenerateDrugMutation() {
    return useMutation(GENERATE_DRUG);
  },

  useCreateDrugMutation() {
    return useMutation(CREATE_DRUG);
  },

  useGetDrugsLazyQuery() {
    return useLazyQuery(GET_DRUGS);
  },
};
