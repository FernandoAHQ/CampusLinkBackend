import {
  IsString,
  IsEmail,
  IsInt,
  MinLength,
  MaxLength,
  IsBoolean,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @MaxLength(100, { message: 'Name must be less than 100 characters' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString({ message: 'Invalid format' })
  @MaxLength(100, { message: 'picture must be less than 100 characters' })
  profile_picture: string;

  @IsInt({ message: 'Section must be a valid number' })
  section: number;

  @IsBoolean({ message: 'Active must be a boolean' })
  active: boolean;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
