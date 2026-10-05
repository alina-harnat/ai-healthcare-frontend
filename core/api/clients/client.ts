'use client';

import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

import { authErrorLink, httpLink, wsLink } from '../links';

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    const isSubscription =
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription';

    return isSubscription;
  },
  wsLink,
  httpLink,
);

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authErrorLink, splitLink]),
});
