import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiAuthGuard } from '../auth/guards/api.auth.guard';

@Controller('events')
export class EventsController {
  constructor(private eventService: EventsService) {}

  @UseGuards(ApiAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.eventService.deleteEvent(id);
  }
}
