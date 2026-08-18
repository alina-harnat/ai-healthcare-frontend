'use client';

import { ReactNode } from 'react';

import type { CurrentUser } from '../../../user/types';
import { Sidebar } from '../sidebar';
import { Root, Content } from './dashboard-layout-styles';

type Props = {
  children: ReactNode;
  currentUser?: CurrentUser | null;
};

export function DashboardLayout({ children, currentUser }: Props) {
  return (
    <Root>
      <Sidebar currentUser={currentUser ?? null} />
      <Content>{children}</Content>
    </Root>
  );
}
