import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CommentModel } from './comment.model';
import { CreateCommentDto } from './createcomment.dto';
import { UpdateCommentDto } from './update.dto';
import { UserModel } from 'src/User/user.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(CommentModel)
    private commentModel: typeof CommentModel,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<CommentModel> {
    return this.commentModel.create(createCommentDto);
  }

  async findAll(blogId: number): Promise<CommentModel[]> {
    return this.commentModel.findAll({
      where: { blogId },
      attributes: ['content'],
      include: [
        {
          model: UserModel,
          attributes: ['username'], // Fetch only username from User table
        },
      ],
    });
  }

  async findOne(id: number): Promise<CommentModel> {
    return this.commentModel.findOne({ where: { id }, include: { all: true } });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<void> {
    const comment = await this.findOne(id);
    await comment.update(updateCommentDto);
  }

  async remove(id: number): Promise<void> {
    const comment = await this.findOne(id);
    await comment.destroy();
  }
}
