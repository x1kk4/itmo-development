import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, MaxLength } from 'class-validator';

export class EditProfileRequestDto {
  @ApiProperty({ example: '+79219211337', required: false })
  @IsOptional()
  @IsPhoneNumber()
  phone: string | null;

  @ApiProperty({ example: '@gregjs', required: false })
  @IsOptional()
  telegram: string | null;

  @ApiProperty({ example: 'Валерий', required: false })
  @IsOptional()
  @MaxLength(32)
  firstname: string | null;

  @ApiProperty({ example: 'Жмышенко', required: false })
  @IsOptional()
  @MaxLength(32)
  surname: string | null;

  @ApiProperty({ example: 'Альбертович', required: false })
  @IsOptional()
  @MaxLength(32)
  middlename: string | null;
}
