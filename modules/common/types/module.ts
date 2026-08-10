import type { ModuleRoutes } from './route';
import type { AppLocales } from './localization';

export type Module = {
  routes?: ModuleRoutes;
  locales?: AppLocales;
};
