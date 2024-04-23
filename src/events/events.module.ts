import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.model';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    JwtModule.register({}),
    AuthModule,
  ],
  controllers: [EventsController],
  providers: [EventsService, EventsResolver],
})
export class EventsModule {}
