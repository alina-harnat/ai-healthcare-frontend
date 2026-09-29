import { useSubscription } from '@apollo/client/react';

import { DRUG_CREATED } from './subscription-queries';
import type { DrugCreatedSubscriptionResponse } from '../types';

export const drugSubscriptionApi = {
  useDrugCreatedSubscription(
    options?: useSubscription.Options<DrugCreatedSubscriptionResponse>,
  ) {
    return useSubscription(DRUG_CREATED, options);
  },
};
