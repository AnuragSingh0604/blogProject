import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  @MaxLength(20, { message: 'title must not be longer than 30 characters' })
  content?: string;
}
