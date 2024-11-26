import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './Dto/createblog.dto';
import { UpdateBlogDto } from './Dto/updateblog.dto';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get(':username')
  findAll(@Param('username') username: string) {
    return this.blogService.findAll(username);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.blogService.findOne(id);
  }
  @Get()
  fetchAllBlogs() {
    return this.blogService.findAllBlogs();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.blogService.remove(id);
  }
}
