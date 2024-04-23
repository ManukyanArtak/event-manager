import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { isExist } from '../../validation/isExist/isExist';


export class VerifyDto {
  @IsEmail()
  @IsNotEmpty()
  @isExist({ tableName: 'users', column: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
