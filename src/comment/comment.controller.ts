import {
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Controller,
  BadRequestException,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CommentDto } from './dtos/comment.dto';
import { CommentService } from './comment.service';
import { ApiAuthGuard } from '../auth/guards/api.auth.guard';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(ApiAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async createComment(
    @Req() request,
    @Body() commentDto: CommentDto,
    @Res() res: Response,
  ) {
    try {
      const comment = await this.commentService.createComment({
        ...commentDto,
        user_id: request.user.id,
      });
      res.json(comment);
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  }
}
