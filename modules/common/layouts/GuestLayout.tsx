import { redirect } from '@/core/localization/navigation';
import { getLocale } from 'next-intl/server';

import { DrugRoutes } from '@/modules/drug/enums';
import { userService } from '../../user/services';

export async function GuestLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await userService.getCurrentUser();

  if (currentUser) {
    redirect({ href: DrugRoutes.Drugs, locale: await getLocale() });
  }

  return children;
}
