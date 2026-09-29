'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from '../config';

type Props = {
  children: React.ReactNode;
};

export function LocalizationProvider({ children }: Props) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
