import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { CreateUserDto } from './Dto/createUser.dto';
import { UpdateUserDto } from './Dto/updateUser.dto';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './Dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
    return this.userModel.create(createUserDto);
  }
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;

    // Check if the user exists in the database
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { id: user.id, email: user.email };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your_secret_key',
      {
        expiresIn: '1h',
      },
    );

    return { accessToken };
  }

  async getAllUsers(): Promise<UserModel[]> {
    return this.userModel.findAll();
  }

  async getUserById(id: number): Promise<UserModel> {
    return this.userModel.findByPk(id);
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user.update(updateUserDto);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userModel.findByPk(id);
    if (user) {
      await user.destroy();
    } else {
      throw new Error('User not found');
    }
  }
}
