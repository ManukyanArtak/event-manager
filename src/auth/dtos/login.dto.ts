import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {isExist} from "../../validation/isExist/isExist";

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @isExist({ tableName: 'users', column: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
