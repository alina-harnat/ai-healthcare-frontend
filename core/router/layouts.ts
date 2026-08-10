import type { ComponentType, ReactNode } from 'react';

import { Layout } from '../../modules/common/enums';
import { AuthLayout } from '../../modules/auth/components';

type LayoutProps = {
  children: ReactNode;
};

export const layouts: Record<Layout, ComponentType<LayoutProps>> = {
  [Layout.Auth]: AuthLayout,
  [Layout.Public]: AuthLayout,
};
