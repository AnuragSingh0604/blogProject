import { IsString, IsNotEmpty, IsInt, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20, { message: 'comment must not be longer than 30 characters' })
  content: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  blogId: number;
}
