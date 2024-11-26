import { table } from 'console';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { BlogModel } from 'src/Blog/blog.model';
import { UserModel } from 'src/User/user.model';

@Table({ tableName: 'Like', timestamps: false })
export class LikeModel extends Model<LikeModel> {
  @ForeignKey(() => UserModel)
  @Column({ allowNull: false, type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => BlogModel)
  @Column({ allowNull: false, type: DataType.INTEGER })
  blogId: number;

  @BelongsTo(() => BlogModel)
  blog: BlogModel;

  @BelongsTo(() => UserModel)
  user: UserModel;
}
