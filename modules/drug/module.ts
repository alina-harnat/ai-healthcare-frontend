import type { Module } from '../common/types/module';
import { drugLocales } from './locales';
import { routes } from './routes';

export const DrugModule: Module = {
  locales: drugLocales,
  routes,
};
