import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { CreateUserDto } from './Dto/createUser.dto';
import { UpdateUserDto } from './Dto/updateUser.dto';
import { LoginDto } from './Dto/login.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create a new user

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<Object> {
    await this.userService.createUser(createUserDto);
    return {
      status: 'success',
      message: 'registered successfully',
    };
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  // Get all users
  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return this.userService.getAllUsers();
  }

  // Get user by ID
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.userService.getUserById(id);
  }

  // Update user by ID
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    await this.userService.updateUser(id, updateUserDto);

    return {
      status: 'success',
      message: 'profile updated',
    };
  }

  // Delete user by ID
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
