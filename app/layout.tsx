import { MuiProvider } from '../core/theme/providers';
import { GraphQLProvider } from '../core/api/providers';
import { LocalizationProvider } from '../core/localization/providers';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html>
      <body>
        <AppRouterCacheProvider>
          <LocalizationProvider>
            <GraphQLProvider>
              <MuiProvider>{children}</MuiProvider>
            </GraphQLProvider>
          </LocalizationProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
