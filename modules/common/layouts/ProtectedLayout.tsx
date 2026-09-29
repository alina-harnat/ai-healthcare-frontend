import { redirect } from 'next/navigation';

import { AuthRoutes } from '@/modules/auth/enums';
import { userService } from '../../user/services';

export async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await userService.getCurrentUser();

  if (!currentUser) {
    redirect(AuthRoutes.Login);
  }

  return children;
}
