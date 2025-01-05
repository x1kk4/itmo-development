import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class BaseUserResponseDto implements User {
  @ApiProperty({ example: '1' })
  id: number;

  @ApiProperty({ enum: Role, example: Role.PARENT })
  role: Role;

  @ApiProperty({ example: 'username123' })
  login: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: '+79219211337' })
  phone: string;

  @ApiProperty({ example: 'Валерий' })
  firstname: string;

  @ApiProperty({ example: 'Жмышенко' })
  surname: string;

  @ApiProperty({ example: 'Альбертович' })
  middlename: string;

  @ApiProperty({
    example: 'https://avatars.githubusercontent.com/u/6916170?v=4',
  })
  profilePicture: string;

  @Exclude()
  password: string;

  @Exclude()
  refreshToken: string;
}

export class UserResponseDto extends OmitType(BaseUserResponseDto, [
  'password',
  'refreshToken',
] as const) {}
