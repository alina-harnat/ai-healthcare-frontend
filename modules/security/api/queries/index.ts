import { gql } from '@apollo/client';

export const TWO_FACTOR_METHODS = gql`
  query TwoFactorMethods {
    twoFactorMethods {
      type
      isEnabled
      isVerified
    }
  }
`;

export const SETUP_TOTP = gql`
  mutation SetupTotp {
    setupTotp {
      qrCode
    }
  }
`;

export const SETUP_EMAIL_TWO_FACTOR = gql`
  mutation SetupEmailTwoFactor {
    setupEmailTwoFactor {
      challengeToken
    }
  }
`;

export const ENABLE_TWO_FACTOR = gql`
  mutation EnableTwoFactor($input: TwoFactorInput!) {
    enableTwoFactor(input: $input)
  }
`;

export const VERIFY_TWO_FACTOR = gql`
  mutation VerifyTwoFactor($input: TwoFactorInput!) {
    verifyTwoFactor(input: $input)
  }
`;

export const DISABLE_TWO_FACTOR = gql`
  mutation DisableTwoFactor($input: TwoFactorInput!) {
    disableTwoFactor(input: $input)
  }
`;
