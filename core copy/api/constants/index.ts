import { gql } from '@apollo/client';

export const REFRESH_TOKEN = gql`
  mutation Refresh {
    refresh
  }
`;

export const REFRESH_ATTEMPTED = 'refreshAttempted';
