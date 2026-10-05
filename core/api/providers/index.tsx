'use client';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '../clients/client';

interface GraphQLProviderProps {
  children: React.ReactNode;
}

export function GraphQLProvider({ children }: GraphQLProviderProps) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
