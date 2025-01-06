import { IsString, MinLength, MaxLength, IsIn } from 'class-validator';

// Define the type for role
export type AdminRole = 'admin' | 'superadmin';

export class CreateAdminDto {
  @IsString()
  @MinLength(4, { message: 'Username must be at least 4 characters long.' })
  @MaxLength(20, { message: 'Username must be less than 20 characters long.' })
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password: string;

  @IsString()
  @IsIn(['admin', 'superadmin'], {
    message: 'Role must be either admin or superadmin.',
  })
  role: AdminRole;
}
