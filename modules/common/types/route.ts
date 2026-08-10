import { ComponentType } from 'react';
import { Layout, RouteAccess, Permission } from '../enums';

export type RouteMeta = {
  access: RouteAccess;
  layout: Layout;
  permissions: Permission[];
  component: ComponentType;
};

export type ModuleRoutes = ModuleRoute[];

export type ModuleRoute = {
  path: string;
  page: string;
  meta: RouteMeta;
};
