import { IsString, MinLength, MaxLength } from 'class-validator';

export class StudentLoginDto {
  @IsString()
  @MaxLength(50, { message: 'Username must be less than 50 characters' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
