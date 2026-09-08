import { useMutation } from '@apollo/client/react';

import { REGISTER, LOGIN, LOGOUT } from './queries';

export const authApi = {
  useRegisterMutation() {
    return useMutation(REGISTER);
  },

  useLoginMutation() {
    return useMutation(LOGIN);
  },

  useLogoutMutation() {
    return useMutation(LOGOUT);
  },
};
