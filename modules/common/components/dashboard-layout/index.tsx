'use client';

import { ReactNode } from 'react';

import { Sidebar } from '../sidebar';
import { Root, Content } from './dashboard-layout-styles';

type Props = {
  children: ReactNode;
};

export function DashboardLayout({ children }: Props) {
  return (
    <Root>
      <Sidebar />
      <Content>{children}</Content>
    </Root>
  );
}
