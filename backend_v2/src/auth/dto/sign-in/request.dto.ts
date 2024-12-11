import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class SignInRequestDto {
  @ApiProperty({ example: 'username123' })
  @MinLength(4)
  login: string;

  @ApiProperty({ example: 'Password@123' })
  @MinLength(8)
  password: string;
}
