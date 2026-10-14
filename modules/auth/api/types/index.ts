import { Role } from '@/modules/common/enums';

export type RegisterInput = {
  email: string;
  password: string;
  role: Role;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type TwoFactorType = 'TOTP' | 'EMAIL';

export type LoginResponse = {
  authenticated: boolean;
  requiresTwoFactor: boolean;
  loginChallengeToken?: string | null;
  availableMethods: TwoFactorType[];
};

export type LoginMutationResponse = {
  login: LoginResponse;
};

export type LoginMutationVariables = {
  input: LoginInput;
};

export type LoginChallengeInput = {
  loginChallengeToken: string;
};

export type VerifyLoginTwoFactorInput = LoginChallengeInput & {
  type: TwoFactorType;
  code: string;
};

export type VerifyLoginTwoFactorResponse = {
  verifyLoginTwoFactor: boolean;
};

export type VerifyLoginTwoFactorVariables = {
  input: VerifyLoginTwoFactorInput;
};
