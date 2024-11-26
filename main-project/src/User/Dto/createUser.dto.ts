import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Username must be at least 5 characters long' })
  @MaxLength(20, { message: 'Username must not be longer than 20 characters' })
  username: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
