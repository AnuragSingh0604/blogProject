import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { BlogModel } from 'src/Blog/blog.model';
import { UserModel } from 'src/User/user.model';

@Table({ tableName: 'Comment', timestamps: false })
export class CommentModel extends Model<CommentModel> {
  @Column({ type: DataType.TEXT, allowNull: false })
  content: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => BlogModel)
  @Column({ type: DataType.INTEGER })
  blogId: number;

  @BelongsTo(() => BlogModel)
  blog: BlogModel;

  @BelongsTo(() => UserModel)
  user: UserModel;
}
