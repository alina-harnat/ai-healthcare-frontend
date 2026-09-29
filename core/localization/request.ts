import { getRequestConfig } from 'next-intl/server';

import { resources } from './resources';

export const locales = ['en', 'uk'] as const;

export type Locale = (typeof locales)[number];

const DEFAULT_LOCALE: Locale = 'en';

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;

  const locale =
    requestedLocale && isLocale(requestedLocale)
      ? requestedLocale
      : DEFAULT_LOCALE;

  return {
    locale,
    messages: resources[locale],
  };
});
