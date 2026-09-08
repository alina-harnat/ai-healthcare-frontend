import type { ModuleRoutes } from '../common/types';
import { RouteAccess, Layout } from '../common/enums';
import { DrugRoutes } from './enums';
import DrugsPage from './pages/drugs';
import GenerateDrugPage from './pages/generate';
import { Permission } from '../common/enums';

export const routes: ModuleRoutes = [
  {
    path: DrugRoutes.Drugs,
    meta: {
      access: RouteAccess.Protected,
      layout: Layout.Dashboard,
      permissions: [Permission.Admin, Permission.User],
      component: DrugsPage,
    },
  },
  {
    path: DrugRoutes.GenerateDrug,
    meta: {
      access: RouteAccess.Protected,
      layout: Layout.Dashboard,
      permissions: [Permission.Admin, Permission.User],
      component: GenerateDrugPage,
    },
  },
];
