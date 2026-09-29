import { redirect } from 'next/navigation';

import { DrugRoutes } from '@/modules/drug/enums';
import { userService } from '../../user/services';

export async function GuestLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await userService.getCurrentUser();

  if (currentUser) {
    redirect(DrugRoutes.Drugs);
  }

  return children;
}
