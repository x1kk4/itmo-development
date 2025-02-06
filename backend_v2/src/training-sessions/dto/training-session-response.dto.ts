import { ApiProperty } from '@nestjs/swagger';
import { Level, TrainingSession } from '@prisma/client';

export class TrainingSessionResponseDto implements TrainingSession {
  @ApiProperty({ example: 128 })
  id: number;

  @ApiProperty({ example: Level.INTERMEDIATE })
  groupLevel: Level;

  startDate: Date;
  endDate: Date;

  @ApiProperty({ example: 2 })
  coachId: number;

  @ApiProperty({ example: 3 })
  branchId: number;
}
