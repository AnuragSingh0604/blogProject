import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LikeModel } from './like.model';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';

@Module({
  imports: [SequelizeModule.forFeature([LikeModel])],
  providers: [LikeService],
  controllers: [LikeController],
})
export class LikeModule {}
