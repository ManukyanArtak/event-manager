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
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('comment')
export class CommentController {
  constructor(
    private commentService: CommentService,
    private eventEmitter: EventEmitter2,
  ) {}

  @UseGuards(ApiAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async createComment(
    @Req() request,
    @Body() commentDto: CommentDto,
    @Res() res: Response,
  ) {
    try {
      const newComment = await this.commentService.createComment({
        ...commentDto,
        user_id: request.user.id,
      });

      const comment = await this.commentService.findComment(newComment.id);

      this.eventEmitter.emit('send.newComment.notification', {
        email: comment.event.user.email,
        eventName: comment.event.name,
        comment: commentDto.text,
      });

      res.json(newComment);
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  }
}
