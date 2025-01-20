import {
  IsString,
  IsEmail,
  IsInt,
  MinLength,
  MaxLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class EditStudentDto {
  @IsInt({ message: 'ID must be a valid number' })
  id: number;

  @IsString()
  @MaxLength(100, { message: 'Name must be less than 100 characters' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Invalid format' })
  @MaxLength(100, { message: 'picture must be less than 100 characters' })
  profile_picture: string;

  @IsOptional()
  @IsInt({ message: 'Section must be a valid number' })
  section: number;

  @IsBoolean({ message: 'Active must be a boolean' })
  active: boolean;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
