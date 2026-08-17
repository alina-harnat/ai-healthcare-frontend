import { useMutation, useLazyQuery } from '@apollo/client/react';

import { GENERATE_DRUG, CREATE_DRUG, GET_DRUGS } from './constants';

import type { Drug } from '../components';

export interface GetDrugsQueryResponse {
  getDrugs: {
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
    filters?: {
      searchText?: string;
    };
  };
}

export const drugApi = {
  useGenerateDrugMutation() {
    return useMutation(GENERATE_DRUG);
  },

  useCreateDrugMutation() {
    return useMutation(CREATE_DRUG);
  },

  useGetDrugsLazyQuery() {
    return useLazyQuery<GetDrugsQueryResponse, GetDrugsQueryVariables>(
      GET_DRUGS,
    );
  },
};
