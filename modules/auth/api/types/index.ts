import { Role } from '@/modules/common/enums';

export type RegisterInput = {
  email: string;
  password: string;
  role: Role;
};

export type LoginInput = {
  email: string;
  password: string;
};
