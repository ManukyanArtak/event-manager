import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersService } from '../users/users.service';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  signIn = async (email: string, password: string) => {
    const user = await this.usersService.findOneByEmail(email);

    if (!user.is_verified) {
      throw new ForbiddenException();
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const isMatch = await bcrypt.compare(passwordHash, user.password);

    if (isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, email: user.email };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.ACCESS_TOKEN,
      expiresIn: '1d',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.REFRESH_TOKEN,
      expiresIn: '365d',
    });

    return {
      refreshToken,
      accessToken,
    };
  };

  refreshToken = async (token: string) => {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.REFRESH_TOKEN,
    });

    const accessToken = await this.jwtService.signAsync(
      { email: payload.email },
      {
        secret: jwtConstants.ACCESS_TOKEN,
        expiresIn: '1d',
      },
    );

    return {
      accessToken,
    };
  };

  verifyEmail = async (verifyData) => {
    const user = await this.usersService.findOneByEmail(verifyData.email);

    if (user.verification_code != verifyData.code) {
      throw new ForbiddenException();
    }

    await this.usersService.updateUser({ ...user, is_verified: true });
  };

  register = async (userData) => {
    return await this.usersService.createUser(userData);
  };

  async verifyToken(request: Request): Promise<any> {
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.ACCESS_TOKEN,
      });
      return payload;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request?.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
