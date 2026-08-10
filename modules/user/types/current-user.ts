import { Permission } from '../../../modules/common/enums';

export type CurrentUser = {
  id: string;
  email: string;
  role: Permission;
};

export type CurrentUserResponse = {
  currentUser: CurrentUser | null;
};
