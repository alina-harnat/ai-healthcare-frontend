import { RouteAccess } from '../../../modules/common/enums';
import type { ModuleRoute } from '../../../modules/common/types';
import type { CurrentUser } from '../../../modules/user/types';
import { RootModule } from '../../../modules';

class RouteService {
  private readonly routes = RootModule.routes;

  public getRedirectPath(
    route: ModuleRoute,
    user: CurrentUser | null,
  ): string | null {
    return this.checkAccess(route, user) ?? this.checkPermissions(route, user);
  }

  public resolvePath(path: string): ModuleRoute | undefined {
    const normalizedPath = path.replace(/^\/+/, '').replace(/\/+$/, '');

    if (!this.routes) {
      return;
    }

    return this.routes.find((route) => route.path === normalizedPath);
  }

  private checkAccess(
    route: ModuleRoute,
    user: CurrentUser | null,
  ): string | null {
    const { access } = route.meta;

    if (access === RouteAccess.Guest && user) {
      return '/drugs';
    }

    if (access === RouteAccess.Protected && !user) {
      return '/login';
    }

    return null;
  }

  private checkPermissions(
    route: ModuleRoute,
    user: CurrentUser | null,
  ): string | null {
    const { permissions } = route.meta;

    if (!user || permissions.length === 0) {
      return null;
    }

    const hasPermission = permissions.includes(user.role);

    if (!hasPermission) {
      return '/f';
    }

    return null;
  }
}

export const routeService = new RouteService();
