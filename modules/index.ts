import type { Module } from './common/types';
import { AuthModule } from './auth/module';
import { DrugModule } from './drug/module';

const modules = [AuthModule, DrugModule];

const { routes, locales } = modules.reduce<Module>(
  (moduleComponents, module) => ({
    routes: [...(moduleComponents.routes || []), ...(module.routes || [])],
    locales: { ...(moduleComponents.locales || {}), ...(module.locales || {}) },
  }),
  {
    routes: [],
    locales: {},
  },
);

export const RootModule: Module = {
  routes,
  locales,
};
