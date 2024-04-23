import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, MailerModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
