import { Transform } from 'class-transformer';
import { UserGender } from '../../users/user.entity';
import { isUnique } from '../../validation/isUnique/isUnique';
import { IsEmail, IsNotEmpty, IsDate, IsString, IsEnum } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @isUnique({ tableName: 'users', column: 'email' })
  email: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  birthday: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsEnum(UserGender)
  gender: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
