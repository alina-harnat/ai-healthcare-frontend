import { MuiProvider } from '../core/theme/providers';
import { GraphQLProvider } from '../core/api/providers';
import { CurrentUserProvider } from '../modules/user/providers';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html>
      <body>
        <AppRouterCacheProvider>
          <GraphQLProvider>
            <CurrentUserProvider>
              <MuiProvider>{children}</MuiProvider>
            </CurrentUserProvider>
          </GraphQLProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
