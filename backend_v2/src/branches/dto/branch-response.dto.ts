import { ApiProperty } from '@nestjs/swagger';
import { Branch } from '@prisma/client';

export class BranchResponseDto implements Branch {
  @ApiProperty({ example: '1' })
  id: number;

  @ApiProperty({ example: '1-й Верхний пер., 2' })
  name: string;

  @ApiProperty({ example: '60.054826, 30.379982' })
  location: string;

  @ApiProperty({ example: '10:00' })
  workingStart: string;

  @ApiProperty({ example: '22:00' })
  workingEnd: string;

  @ApiProperty({ example: '+79996661337' })
  contactPhone: string;

  @ApiProperty({ example: 'verh-pereulok@nevsky-bears.ru' })
  contactEmail: string;

  @ApiProperty({ example: '@gregjs', required: false })
  contactTelegram: string | null;

  @ApiProperty({
    example: [
      'https://avatars.mds.yandex.net/get-altay/5448678/2a0000017d380ed520715939ff36c2a5efe0/L_height',
    ],
    required: false,
  })
  photos: string[];

  @ApiProperty({ example: 'https://yandex.ru/maps/YOUR_LINK', required: false })
  yaMapsLink: string | null;

  @ApiProperty({ example: 'https://2gis.ru/YOUR_LINK', required: false })
  twogisLink: string | null;

  @ApiProperty({
    example: 'https://www.google.com/maps/YOUR_LINK',
    required: false,
  })
  gMapsLink: string | null;

  constructor(partial: Partial<Branch>) {
    Object.assign(this, partial);
  }
}
