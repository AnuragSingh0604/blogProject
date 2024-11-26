import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogModel } from './blog.model';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';

@Module({
  imports: [SequelizeModule.forFeature([BlogModel])],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
