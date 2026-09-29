import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs';

import { serverAuthLink } from '../links/server-auth-link';

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: serverAuthLink.concat(
      new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
      }),
    ),
  });
});
