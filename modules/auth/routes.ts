import type { ModuleRoutes } from '../common/types';
import { RouteAccess, Layout } from '../common/enums';
import { LoginPage, RegisterPage } from './pages';

export const routes: ModuleRoutes = [
  {
    path: 'login',
    page: 'login',
    meta: {
      access: RouteAccess.Guest,
      layout: Layout.Auth,
      permissions: [],
      component: LoginPage,
    },
  },
  {
    path: 'register',
    page: 'register',
    meta: {
      access: RouteAccess.Guest,
      layout: Layout.Auth,
      permissions: [],
      component: RegisterPage,
    },
  },
];
