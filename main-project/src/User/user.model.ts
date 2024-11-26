import {
  BeforeSave,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import * as bcrypt from 'bcryptjs';

import { BlogModel } from 'src/Blog/blog.model';
import { CommentModel } from 'src/Comment/comment.model';
import { LikeModel } from 'src/Like/like.model';

@Table({ tableName: 'User', timestamps: false })
export class UserModel extends Model<UserModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  // Hash the password before saving the user
  @BeforeSave
  static async hashPassword(user: UserModel) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }

  //Relationships (blogs, comments, likes)
  @HasMany(() => BlogModel)
  blogs: BlogModel[];

  @HasMany(() => CommentModel)
  comments: CommentModel[];

  @HasMany(() => LikeModel)
  likes: LikeModel[];
}
