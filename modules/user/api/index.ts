import { useQuery } from '@apollo/client/react';

import { CURRENT_USER } from './queries';

export const userApi = {
  useCurrentUserQuery() {
    return useQuery(CURRENT_USER);
  },
};
