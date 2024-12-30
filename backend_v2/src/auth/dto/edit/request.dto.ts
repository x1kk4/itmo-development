import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, MaxLength } from 'class-validator';

export class EditProfileRequestDto {
  @ApiProperty({ example: '+79219211337' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: 'Валерий' })
  @MaxLength(32)
  firstname: string;

  @ApiProperty({ example: 'Жмышенко' })
  @MaxLength(32)
  surname: string;

  @ApiProperty({ example: 'Альбертович' })
  @MaxLength(32)
  middlename: string;
}
