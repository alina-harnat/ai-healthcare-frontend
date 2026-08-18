'use client';

import { createContext, useContext, type ReactNode } from 'react';

import { userApi } from '@/modules/user/api';
import type { CurrentUser } from '@/modules/user/types';

type CurrentUserContextValue = {
  currentUser: CurrentUser | null;
  loading: boolean;
};

const CurrentUserContext = createContext<CurrentUserContextValue>({
  currentUser: null,
  loading: true,
});

type CurrentUserProviderProps = {
  children: ReactNode;
};

export const CurrentUserProvider = ({ children }: CurrentUserProviderProps) => {
  const { data, loading } = userApi.useCurrentUserQuery();

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser: data?.currentUser ?? null,
        loading,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
