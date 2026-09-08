import { useCurrentUser } from '../../user/providers';

export const useHasPermissions = () => {
  const { currentUser } = useCurrentUser();

  const hasPermission = (role: string) => currentUser?.role === role;

  return {
    hasPermission,
  };
};
