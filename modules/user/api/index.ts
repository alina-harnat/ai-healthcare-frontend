import { useQuery } from '@apollo/client/react';

import { CURRENT_USER } from './constants';
import { CurrentUserResponse } from '../types';

export const userApi = {
  useCurrentUserQuery() {
    return useQuery<CurrentUserResponse>(CURRENT_USER);
  },
};
