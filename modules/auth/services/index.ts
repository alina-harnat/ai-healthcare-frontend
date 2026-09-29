import type { ModuleRoute } from '../../../modules/common/types';
import type { CurrentUser } from '../../../modules/user/types';
import { CombinedGraphQLErrors } from '@apollo/client';

class AuthService {
  public hasPermission(route: ModuleRoute, user: CurrentUser | null): boolean {
    const { permissions } = route.meta;

    if (permissions.length === 0) {
      return true;
    }

    if (!user) {
      return false;
    }

    return permissions.includes(user.role);
  }

  public isUnauthorized(error: unknown): boolean {
    if (!CombinedGraphQLErrors.is(error)) {
      return false;
    }

    return error.errors.some(({ message }) => message === 'Unauthorized');
  }
}

export const authService = new AuthService();
