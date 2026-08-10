import type { Module } from '../common/types/module';
import { routes } from './routes';
import { authLocales } from './locales';

export const AuthModule: Module = {
  routes,
  locales: authLocales,
};
