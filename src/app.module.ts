import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { EventsModule } from './events/events.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Event } from './events/event.model';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { NotificationModule } from './notification/notification.module';
import { IsUniqueConstraint } from './validation/isUnique/isUniqueConstraint';
import { EventEmitterModule } from '@nestjs/event-emitter';
import {IsExistConstraint} from "./validation/isExist/isExistConstraint";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ({
          type: 'postgres',
          host: configService.get('HOST'),
          port: +configService.get('PORT'),
          username: configService.get('USERNAME'),
          password: configService.get('PASSWORD'),
          database: configService.get('DATABASE'),
          entities: [Event, User],
          synchronize: true,
        }) as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: './src/schema.gql',
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('SES_HOST'),
          port: config.get('SES_PORT'),
          ignoreTLS: false,
          secure: false,
          auth: {
            user: config.get('SES_SMTP_USERNAME'),
            pass: config.get('SES_SMTP_PASSWORD'),
          },
        },
        preview: false,
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    EventsModule,
    UsersModule,
    AuthModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [IsUniqueConstraint, IsExistConstraint],
})
export class AppModule {}
