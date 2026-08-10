import { CombinedGraphQLErrors } from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';
import { Observable } from '@apollo/client/utilities';
import { print } from 'graphql';
import { Mutex } from 'async-mutex';
import { REFRESH_TOKEN, REFRESH_ATTEMPTED } from '../constants';

const refreshMutex = new Mutex();
let refreshPromise: Promise<boolean> | null = null;

export const authErrorLink = new ErrorLink(({ error, operation, forward }) => {
  if (!isUnauthorized(error)) {
    return;
  }

  if (operation.getContext()[REFRESH_ATTEMPTED]) {
    return;
  }

  return new Observable((observer) => {
    let subscription: { unsubscribe: () => void } | undefined;

    refresh()
      .then((isRefreshed) => {
        if (!isRefreshed) {
          observer.error(error);
          return;
        }

        operation.setContext({
          ...operation.getContext(),
          [REFRESH_ATTEMPTED]: true,
        });

        subscription = forward(operation).subscribe({
          next: (result) => observer.next(result),
          error: (retryError) => observer.error(retryError),
          complete: () => observer.complete(),
        });
      })
      .catch((retryError) => {
        observer.error(retryError);
      });

    return () => {
      subscription?.unsubscribe();
    };
  });
});

function isUnauthorized(error: unknown): boolean {
  if (!CombinedGraphQLErrors.is(error)) {
    return false;
  }

  return error.errors.some((err) => err.message === 'Unauthorized');
}

async function refreshAccessToken(): Promise<boolean> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        operationName: 'RefreshToken',
        query: print(REFRESH_TOKEN),
      }),
    });

    if (!response.ok) {
      return false;
    }

    const result = await response.json();

    return result.data?.refreshToken === true;
  } catch {
    return false;
  }
}

async function refresh(): Promise<boolean> {
  if (refreshPromise) {
    return refreshPromise;
  }

  return await refreshMutex.runExclusive(async () => {
    if (refreshPromise) {
      return refreshPromise;
    }

    refreshPromise = refreshAccessToken();

    try {
      return await refreshPromise;
    } finally {
      refreshPromise = null;
    }
  });
}
