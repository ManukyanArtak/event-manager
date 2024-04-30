import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiAuthGuard } from '../auth/guards/api.auth.guard';
import { Response } from 'express';
import { CommentService } from '../comment/comment.service';

@Controller('events')
export class EventsController {
  constructor(
    private eventService: EventsService,
    private commentService: CommentService,
  ) {}

  @UseGuards(ApiAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      await this.eventService.deleteEvent(id);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @UseGuards(ApiAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id/comments')
  async getEventComments(@Param('id') id: number, @Res() res: Response) {
    try {
      const comments = await this.commentService.findEventComments(id);

      res.json(comments);
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  }
}
