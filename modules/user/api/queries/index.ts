import { gql, type TypedDocumentNode } from '@apollo/client';

import type { CurrentUserResponse } from '../../types';

export const CURRENT_USER: TypedDocumentNode<CurrentUserResponse> = gql`
  query CurrentUser {
    currentUser {
      id
      email
      role
    }
  }
`;
