'use client';

import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { authErrorLink, httpLink } from '../links';

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authErrorLink, httpLink]),
});
