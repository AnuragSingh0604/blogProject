import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentModel } from './comment.model';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  imports: [SequelizeModule.forFeature([CommentModel])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
