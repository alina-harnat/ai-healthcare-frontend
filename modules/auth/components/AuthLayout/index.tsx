'use client';

import { ReactNode } from 'react';

import { Page } from './auth-layout-styles';
import { LocaleSwitcher } from '../../../common/components/locale-switcher';

type Props = {
  children: ReactNode;
};

export function AuthLayout({ children }: Props) {
  return (
    <Page>
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1 }}>
        <LocaleSwitcher />
      </div>
      {children}
    </Page>
  );
}
