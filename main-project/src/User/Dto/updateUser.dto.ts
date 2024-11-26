import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
export class UpdateUserDto{
@IsOptional()
  @IsString()
  @MinLength(3, { message: 'Username must be at least 5 characters long' })
  @MaxLength(20, { message: 'Username must not be longer than 20 characters' })
  username?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string;
}