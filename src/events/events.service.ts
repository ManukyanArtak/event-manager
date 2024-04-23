import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async deleteEvent(id: number) {
    await this.eventRepository.delete(id);
  }

  async createEvent(event) {
    return await this.eventRepository.save(event);
  }

  async findEvent(id: number) {
    return await this.eventRepository.findOne({
      where: { id },
      relations: ['comments'],
      order: {
        comments: {
          id: 'ASC',
        },
      },
    });
  }

  async getEvents() {
    return await this.eventRepository.find();
  }

  async updateEvent(event) {
    return await this.eventRepository.save(event);
  }
}
