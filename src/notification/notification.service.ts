import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import {
  getVerificationEmailTemplate,
  VERIFICATION_EMAIL_SUBJECT,
} from './templates';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class NotificationService {
  constructor(
    private mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}
  private async sendMail({ to, subject, html }) {
    try {
      await this.mailerService.sendMail({
        to,
        from: this.configService.get('SES_FROM_MAIL'),
        subject,
        html,
      });
      console.log(`Email send successfully to ${to}`);
    } catch (error) {
      console.log(`Failed to send email to ${to}`, error);
    }
  }

  async sendVerificationEmail(to, code) {
    const html = getVerificationEmailTemplate(code);
    await this.sendMail({ to, subject: VERIFICATION_EMAIL_SUBJECT, html });
  }

  @OnEvent('send.verification.notification')
  async notifyUser(payload) {
    await this.sendVerificationEmail(payload.email, payload.code);
    console.log(
      `Hello user, ${payload.email} has been added to our menu. Enjoy.`,
    );
  }
}
