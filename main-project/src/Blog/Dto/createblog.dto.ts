import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'title must be at least 5 characters long' })
  @MaxLength(20, { message: 'title must not be longer than 40 characters' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000, { message: 'title must not be longer than 40 characters' })
  content: string;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  authorId: number;
}
