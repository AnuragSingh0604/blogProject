import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  userId: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  blogId: number;
}
