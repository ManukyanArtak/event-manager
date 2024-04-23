import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Res,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { ApiAuthGuard } from './guards/api.auth.guard';
import { RegisterDto } from './dtos/register.dto';
import { RefreshTokenDto } from './dtos/refreshToken.dto';
import { NotificationService } from '../notification/notification.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { VerifyDto } from './dtos/verify.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private eventEmitter: EventEmitter2,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const tokens = await this.authService.signIn(
        loginDto.email,
        loginDto.password,
      );

      res.json({ tokens });
    } catch (e) {
      if (e instanceof ForbiddenException) {
        throw e;
      }
      throw new BadRequestException();
    }
  }
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res() res: Response,
  ) {
    try {
      const tokens = await this.authService.refreshToken(refreshTokenDto.token);
      res.json(tokens);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify')
  async verify(@Body() verifyDto: VerifyDto, @Res() res: Response) {
    try {
      await this.authService.verifyEmail(verifyDto);
      res.json({});
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    try {
      const user = await this.authService.register(registerDto);

      this.eventEmitter.emit('send.verification.notification', {
        email: user.email,
        code: user.verification_code,
      });

      res.json({});
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @UseGuards(ApiAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
