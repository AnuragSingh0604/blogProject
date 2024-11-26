import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/createlike.dto';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  likePost(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.likePost(createLikeDto);
  }

  @Delete()
  dislikePost(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.likePost(createLikeDto);
  }

  @Get(':userId')
  likes(@Param('userId', ParseIntPipe) userId: number) {
    return this.likeService.likes(userId);
  }
}
