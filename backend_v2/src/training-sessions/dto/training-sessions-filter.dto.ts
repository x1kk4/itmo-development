import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';

export class TrainingSessionsFilterDto {
  @ApiPropertyOptional({ minimum: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @Min(1, { message: 'Page must be greater than or equal to 1' })
  page?: number = 1;

  @ApiPropertyOptional({ minimum: 1, default: 5 })
  @IsOptional()
  @Type(() => Number)
  @Min(1, { message: 'Limit must be greater than or equal to 1' })
  limit?: number = 5;

  @ApiPropertyOptional({ example: [1, 4] })
  @IsOptional()
  @Type(() => Number)
  branchId?: number[];
}
