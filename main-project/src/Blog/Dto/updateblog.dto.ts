import { IsString, IsOptional } from 'class-validator';

export class UpdateBlogDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
