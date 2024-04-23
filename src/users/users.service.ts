import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async findOneByEmail(email) {
    return await this.userRepository.findOneBy({ email });
  }

  async createUser(user) {
    const verificationCode = await this.generateVerificationCode();

    const passwordHash = await bcrypt.hash(user.password, 10);

    return await this.userRepository.save({
      ...user,
      password: passwordHash,
      verification_code: verificationCode,
    });
  }

  async generateVerificationCode() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  async updateUser(user){
    return await this.userRepository.save(user);
  }
}
