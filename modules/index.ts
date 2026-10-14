import type { Module } from './common/types';
import { AuthModule } from './auth/module';
import { DrugModule } from './drug/module';
import { SecurityModule } from './security/module';

const modules = [AuthModule, DrugModule, SecurityModule];

const { locales } = modules.reduce<Module>(
  (moduleComponents, module) => ({
    locales: { ...(moduleComponents.locales || {}), ...(module.locales || {}) },
  }),
  {
    locales: {},
  },
);

export const RootModule: Module = {
  locales,
};
