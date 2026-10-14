import { useMutation, useQuery } from '@apollo/client/react';

import {
  DISABLE_TWO_FACTOR,
  ENABLE_TWO_FACTOR,
  SETUP_EMAIL_TWO_FACTOR,
  SETUP_TOTP,
  TWO_FACTOR_METHODS,
  VERIFY_TWO_FACTOR,
} from './queries';

export type TwoFactorType = 'TOTP' | 'EMAIL';

export type TwoFactorMethod = {
  type: TwoFactorType;
  isEnabled: boolean;
  isVerified: boolean;
};

export type TwoFactorInput = {
  type: TwoFactorType;
  code: string;
  challengeToken?: string;
};

export const securityApi = {
  useTwoFactorMethodsQuery() {
    return useQuery<{ twoFactorMethods: TwoFactorMethod[] }>(
      TWO_FACTOR_METHODS,
    );
  },

  useSetupTotpMutation() {
    return useMutation<{ setupTotp: { qrCode: string } }>(SETUP_TOTP);
  },

  useSetupEmailTwoFactorMutation() {
    return useMutation<{
      setupEmailTwoFactor: { challengeToken: string };
    }>(SETUP_EMAIL_TWO_FACTOR);
  },

  useEnableTwoFactorMutation() {
    return useMutation<{ enableTwoFactor: boolean }, { input: TwoFactorInput }>(
      ENABLE_TWO_FACTOR,
    );
  },

  useVerifyTwoFactorMutation() {
    return useMutation<{ verifyTwoFactor: boolean }, { input: TwoFactorInput }>(
      VERIFY_TWO_FACTOR,
    );
  },

  useDisableTwoFactorMutation() {
    return useMutation<
      { disableTwoFactor: boolean },
      { input: TwoFactorInput }
    >(DISABLE_TWO_FACTOR);
  },
};
