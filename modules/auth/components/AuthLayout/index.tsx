import { ReactNode } from 'react';

import { Page } from './auth-layout-styles';

type Props = {
  children: ReactNode;
};

export function AuthLayout({ children }: Props) {
  return <Page>{children}</Page>;
}
