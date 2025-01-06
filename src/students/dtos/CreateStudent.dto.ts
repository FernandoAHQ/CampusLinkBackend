import {
  IsString,
  IsEmail,
  IsInt,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @MaxLength(100, { message: 'Name must be less than 100 characters' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsInt({ message: 'Section must be a valid number' })
  section: number;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
