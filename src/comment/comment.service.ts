import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async createComment(comment) {
    return await this.commentRepository.save(comment);
  }

  async getEventComments(eventId) {
    return await this.commentRepository.find({
      where: {
        event_id: eventId,
      },
      order: {
        id: 'ASC',
      },
    });
  }
}
