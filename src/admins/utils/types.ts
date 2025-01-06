import { AdminRole } from '../dtos/createAdmin.dto';

export type CreateAdminParams = {
  username: string;
  password: string;
  role: AdminRole;
};
