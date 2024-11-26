import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './User/user.module';
import { ConfigModule } from '@nestjs/config';
import { UserModel } from './User/user.model';
import { BlogModel } from './Blog/blog.model';
import { CommentModel } from './Comment/comment.model';
import { BlogModule } from './Blog/blog.module';
import { CommentModule } from './Comment/comment.module';
import { LikeModel } from './Like/like.model';
import { LikeModule } from './Like/like.module';
require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'anurag_singh',
      password: process.env.DB_PASSWORD || '7294985449@a',
      database: process.env.DB_NAME || 'anurag',
      models: [UserModel, BlogModel, CommentModel, LikeModel],
      autoLoadModels: true,
      synchronize: true,
      logging: console.log,
    }),
    UserModule,
    BlogModule,
    CommentModule,
    LikeModule,
    SequelizeModule.forFeature([UserModel, BlogModel, CommentModel, LikeModel]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/users/login', method: RequestMethod.POST },
        { path: '/users/register', method: RequestMethod.POST },
      )
      .forRoutes('*'); // Apply to all routes
  }
}
