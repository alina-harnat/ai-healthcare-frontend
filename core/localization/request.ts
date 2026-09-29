import { getRequestConfig } from 'next-intl/server';

import { resources } from './resources';
import { locales, type Locale } from './locales';

export { locales, type Locale } from './locales';

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
    messages: resources[locale] ?? resources.en ?? {},
  };
});
