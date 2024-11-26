import { Module } from '@nestjs/common';
import { UserModel } from './user.model';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]), // Register the User model
    JwtModule.register({
      secret: '7294985449', // Replace with environment variable in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Optional: if you need to use UserService in other modules
})
export class UserModule {}
