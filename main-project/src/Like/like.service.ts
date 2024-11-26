import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LikeModel } from './like.model';
import { CreateLikeDto } from './dto/createlike.dto';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(LikeModel)
    private likeModel: typeof LikeModel,
  ) {}

  async likePost(createLikeDto: CreateLikeDto): Promise<any> {
    const existingLike = await this.likeModel.findOne({
      where: {
        userId: createLikeDto.userId,
        blogId: createLikeDto.blogId,
      },
    });

    if (!existingLike) {
      return this.likeModel.create(createLikeDto);
    }
    return await existingLike.destroy();
  }

  // async unlikePost(userId: number, blogId: number): Promise<void> {
  //   const like = await this.likeModel.findOne({
  //     where: { userId, blogId },
  //   });
  //   if (like) {
  //     await like.destroy();
  //   }
  // }

  async likes(userId: number): Promise<LikeModel[]> {
    return await this.likeModel.findAll({
      where: { userId },
      attributes: ['blogId'], // Example attributes; adjust as needed
    });
  }
}
