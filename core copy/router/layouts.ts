import type { ComponentType, ReactNode } from 'react';

import { Layout } from '../../modules/common/enums';
import type { CurrentUser } from '../../modules/user/types';
import { AuthLayout } from '../../modules/auth/components';
import { DashboardLayout } from '../../modules/common/components';

type LayoutProps = {
  children: ReactNode;
  currentUser?: CurrentUser | null;
};

export const layouts: Record<Layout, ComponentType<LayoutProps>> = {
  [Layout.Auth]: AuthLayout,
  [Layout.Public]: AuthLayout,
  [Layout.Dashboard]: DashboardLayout,
};
