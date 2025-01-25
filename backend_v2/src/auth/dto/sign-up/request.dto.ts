import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class SignUpRequestDto {
  @ApiProperty({ example: 'username123' })
  @MinLength(4)
  login: string;

  @ApiProperty({ example: 'Password@123' })
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;
}
