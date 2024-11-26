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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './createcomment.dto';
import { UpdateCommentDto } from './update.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get(':blogId')
  findAll(@Param('blogId', ParseIntPipe) blogId: number) {
    return this.commentService.findAll(blogId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentService.remove(id);
  }
}
