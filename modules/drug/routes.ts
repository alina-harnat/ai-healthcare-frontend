import type { ModuleRoutes } from '../common/types';
import { RouteAccess, Layout } from '../common/enums';
import DrugsPage from './pages';

export const routes: ModuleRoutes = [
  {
    path: 'drugs',
    page: 'drugs',
    meta: {
      access: RouteAccess.Protected,
      layout: Layout.Dashboard,
      permissions: [],
      component: DrugsPage,
    },
  },
];
