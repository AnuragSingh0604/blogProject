import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { CommentModel } from 'src/Comment/comment.model';
import { LikeModel } from 'src/Like/like.model';
import { UserModel } from 'src/User/user.model';

@Table({ tableName: 'Blog', timestamps: false })
export class BlogModel extends Model<BlogModel> {
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  content: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  authorId: number;

  @BelongsTo(() => UserModel)
  author: UserModel;

  // Relationship with comments
  @HasMany(() => CommentModel)
  comments: CommentModel[];

  // Relationship with likes
  @HasMany(() => LikeModel)
  likes: LikeModel[];
}
