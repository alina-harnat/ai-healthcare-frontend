import { gql, type TypedDocumentNode } from '@apollo/client';
import type {
  LoginChallengeInput,
  LoginMutationResponse,
  LoginMutationVariables,
  VerifyLoginTwoFactorResponse,
  VerifyLoginTwoFactorVariables,
} from '../types';

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input)
  }
`;

export const LOGIN: TypedDocumentNode<
  LoginMutationResponse,
  LoginMutationVariables
> = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      authenticated
      requiresTwoFactor
      loginChallengeToken
      availableMethods
    }
  }
`;

export const REQUEST_LOGIN_EMAIL_CODE: TypedDocumentNode<
  { requestLoginEmailCode: boolean },
  { input: LoginChallengeInput }
> = gql`
  mutation RequestLoginEmailCode($input: LoginChallengeInput!) {
    requestLoginEmailCode(input: $input)
  }
`;

export const VERIFY_LOGIN_TWO_FACTOR: TypedDocumentNode<
  VerifyLoginTwoFactorResponse,
  VerifyLoginTwoFactorVariables
> = gql`
  mutation VerifyLoginTwoFactor($input: VerifyLoginTwoFactorInput!) {
    verifyLoginTwoFactor(input: $input)
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
