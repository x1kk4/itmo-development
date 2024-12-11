import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsEnum, MinLength } from 'class-validator';

export class SignUpRequestDto {
  @ApiProperty({ example: 'username123' })
  @MinLength(4)
  login: string;

  @ApiProperty({ example: 'Password@123' })
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'user@example.com', required: false })
  @IsEmail()
  email?: string;

  @ApiProperty({ enum: Role, example: Role.PARENT })
  @IsEnum(Role)
  role: Role;
}
