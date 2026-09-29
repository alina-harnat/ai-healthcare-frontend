import { redirect } from '@/core/localization/navigation';
import { getLocale } from 'next-intl/server';

import { AuthRoutes } from '@/modules/auth/enums';
import { userService } from '../../user/services';

export async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await userService.getCurrentUser();

  if (!currentUser) {
    redirect({ href: AuthRoutes.Login, locale: await getLocale() });
  }

  return children;
}
