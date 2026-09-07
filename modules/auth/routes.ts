import type { ModuleRoutes } from '../common/types';
import { RouteAccess, Layout } from '../common/enums';
import { LoginPage, RegisterPage } from './pages';
import { AuthRoutes } from './enums';

export const routes: ModuleRoutes = [
  {
    path: AuthRoutes.Login,
    meta: {
      access: RouteAccess.Guest,
      layout: Layout.Auth,
      permissions: [],
      component: LoginPage,
    },
  },
  {
    path: AuthRoutes.Register,
    meta: {
      access: RouteAccess.Guest,
      layout: Layout.Auth,
      permissions: [],
      component: RegisterPage,
    },
  },
];
