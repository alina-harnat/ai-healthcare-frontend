import { SetContextLink } from '@apollo/client/link/context';
import { cookies } from 'next/headers';

export const serverAuthLink = new SetContextLink(async (prevContext) => {
  const cookieStore = await cookies();

  return {
    headers: {
      ...prevContext.headers,
      cookie: cookieStore.toString(),
    },
  };
});
