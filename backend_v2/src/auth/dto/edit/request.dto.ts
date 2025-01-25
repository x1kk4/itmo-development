import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, MaxLength } from 'class-validator';

export class EditProfileRequestDto {
  @ApiProperty({ example: '+79219211337', required: false })
  @IsPhoneNumber()
  phone: string | null;

  @ApiProperty({ example: '@gregjs', required: false })
  telegram: string | null;

  @ApiProperty({ example: 'Валерий', required: false })
  @MaxLength(32)
  firstname: string | null;

  @ApiProperty({ example: 'Жмышенко', required: false })
  @MaxLength(32)
  surname: string | null;

  @ApiProperty({ example: 'Альбертович', required: false })
  @MaxLength(32)
  middlename: string | null;
}
