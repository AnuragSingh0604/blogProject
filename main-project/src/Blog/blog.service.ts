import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BlogModel } from './blog.model';
import { CreateBlogDto } from './Dto/createblog.dto';
import { UpdateBlogDto } from './Dto/updateblog.dto';
import { UserModel } from 'src/User/user.model';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogModel)
    private blogModel: typeof BlogModel,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<BlogModel> {
    return this.blogModel.create(createBlogDto);
  }

  async findAll(username: string): Promise<BlogModel[]> {
    const blogs: BlogModel[] = await this.blogModel.findAll({
      include: [
        {
          model: UserModel,
          as: 'author', // Alias from the association
          where: { username }, // Filter by username in the User model
          attributes: ['id', 'username'], // Optionally exclude user attributes if only username is needed
        },
      ],
    }); // Explicitly type the result

    if (blogs.length === 0) {
      // Now TypeScript should recognize length on blogs
      throw new NotFoundException('No blogs found for this author');
    }

    return blogs;
  }

  async findOne(id: number): Promise<BlogModel> {
    return this.blogModel.findOne({ where: { id }, include: { all: true } });
  }

  async update(id: number, updateBlogDto: UpdateBlogDto): Promise<void> {
    const blog = await this.findOne(id);
    await blog.update(updateBlogDto);
  }

  async remove(id: number): Promise<void> {
    const blog = await this.findOne(id);
    await blog.destroy();
  }
  async findAllBlogs(): Promise<BlogModel[]> {
    return await this.blogModel.findAll({
      include: [
        {
          model: UserModel, // Assuming this is your user model
          attributes: ['username'], // Fetch only the username from User table
        },
      ],
      attributes: ['id', 'title', 'content'], // Specify what to fetch from Blog table
    });
  }
}
