import { Event } from './event.model';
import { EventsService } from './events.service';
import { Inject, UseGuards } from '@nestjs/common';
import { EventCreateInput } from './graphql/event.input';
import { GqlAuthGuard } from '../auth/guards/gql.auth.guard';
import { EventUpdateInput } from './graphql/eventUpdate.input';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';

@Resolver()
export class EventsResolver {
  constructor(
    @Inject(EventsService)
    private eventsService: EventsService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Event])
  async getEvents() {
    const events = await this.eventsService.getEvents();
    return events;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Event)
  async createEvent(
    @Context('req') req,
    @Args('createEventData') eventData: EventCreateInput,
  ) {
    const event = await this.eventsService.createEvent({
      ...eventData,
      user_id: req.user.id,
    });

    return {
      ...event,
      date: new Date(event.date),
    };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Event)
  async updateEvent(@Args('updateEventData') eventData: EventUpdateInput) {
    const event = await this.eventsService.updateEvent(eventData);

    return {
      ...event,
      date: new Date(event.date),
    };
  }
}
