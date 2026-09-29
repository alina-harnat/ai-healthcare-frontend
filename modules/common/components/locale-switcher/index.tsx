'use client';

import { FormControl, MenuItem, Select } from '@mui/material';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { locales, type Locale } from '@/core/localization/locales';
import { usePathname, useRouter } from '@/core/localization/navigation';

type Props = {
  compact?: boolean;
};

export function LocaleSwitcher({ compact = false }: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (nextLocale: string) => {
    if (!locales.includes(nextLocale as Locale)) {
      return;
    }

    const query = Array.from(searchParams.entries()).reduce<
      Record<string, string | string[]>
    >((params, [key, value]) => {
      const current = params[key];

      params[key] =
        current === undefined
          ? value
          : Array.isArray(current)
            ? [...current, value]
            : [current, value];

      return params;
    }, {});

    router.replace({ pathname, query }, { locale: nextLocale as Locale });
  };

  return (
    <FormControl size='small' sx={{ minWidth: compact ? 48 : 88 }}>
      <Select
        aria-label='Language'
        value={locale}
        onChange={(event) => handleChange(event.target.value)}
        sx={{ height: 36, fontSize: 13 }}
      >
        {locales.map((option) => (
          <MenuItem key={option} value={option}>
            {option.toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
