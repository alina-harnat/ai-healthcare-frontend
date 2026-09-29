import { authService } from '../../../modules/auth/services';
import { getClient } from '../../../core/api/clients/server';
import { CURRENT_USER } from '../api/queries';
import type { CurrentUser } from '../types';

class UserService {
  public async getCurrentUser(): Promise<CurrentUser | null> {
    try {
      const { data } = await getClient().query({
        query: CURRENT_USER,
      });

      return data?.currentUser ?? null;
    } catch (error) {
      if (authService.isUnauthorized(error)) {
        return null;
      }

      throw error;
    }
  }
}

export const userService = new UserService();
