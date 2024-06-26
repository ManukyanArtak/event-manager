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

  async findComment(id) {
    return await this.commentRepository.findOne({
      where: { id },
      relations: ['event.user'],
    });
  }

  async findEventComments(eventId) {
    return await this.commentRepository.query(
      'select comments.id,comments.event_id,comments.user_id,comments.text,comments.created_at, u."firstName" as author_first_name, u."lastName" as author_last_name, u.id as author_id ' +
        'from comments  join users u on u.id = comments.user_id where event_id = ' +
        eventId,
    );
  }
}
