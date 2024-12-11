import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponseDto implements User {
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

  @Exclude()
  password: string;

  @Exclude()
  refreshToken: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
