import { useMutation } from '@apollo/client/react';

import {
  LOGIN,
  LOGOUT,
  REGISTER,
  REQUEST_LOGIN_EMAIL_CODE,
  VERIFY_LOGIN_TWO_FACTOR,
} from './queries';

export const authApi = {
  useRegisterMutation() {
    return useMutation(REGISTER);
  },

  useLoginMutation() {
    return useMutation(LOGIN);
  },

  useRequestLoginEmailCodeMutation() {
    return useMutation(REQUEST_LOGIN_EMAIL_CODE);
  },

  useVerifyLoginTwoFactorMutation() {
    return useMutation(VERIFY_LOGIN_TWO_FACTOR);
  },

  useLogoutMutation() {
    return useMutation(LOGOUT);
  },
};
