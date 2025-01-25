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

  @ApiProperty({ example: 'user@example.com', required: false })
  email: string | null;

  @ApiProperty({ example: '+79219211337', required: false })
  phone: string | null;

  @ApiProperty({ example: '@gregjs', required: false })
  telegram: string | null;

  @ApiProperty({ example: 'Валерий', required: false })
  firstname: string | null;

  @ApiProperty({ example: 'Жмышенко', required: false })
  surname: string | null;

  @ApiProperty({ example: 'Альбертович', required: false })
  middlename: string | null;

  @ApiProperty({
    example: 'https://avatars.githubusercontent.com/u/6916170?v=4',
    required: false,
  })
  profilePicture: string | null;

  @Exclude()
  password: string;

  @Exclude()
  refreshToken: string;
}

export class UserResponseDto extends OmitType(BaseUserResponseDto, [
  'password',
  'refreshToken',
] as const) {}
