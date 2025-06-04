import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class LoginDto {

  @ApiProperty({ example: "cp.admin@yopmail.com" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: "Naseni@123" })
  @IsNotEmpty()
  @IsString()
  password: string;
}