import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.model';
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
    console.log(event)
    return await this.eventRepository.save(event);
  }

  async findEvent(id: number) {
    return await this.eventRepository.findBy({ id });
  }

  async getEvents() {
    return await this.eventRepository.find();
  }

  async updateEvent(event) {
    return await this.eventRepository.save(event);
  }
}
