import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'src/dto/pagination.dto';

export class BranchesFilterDto extends PaginationDto {
  @ApiProperty({ example: 60.054826 })
  latitude?: number;

  @ApiProperty({ example: 30.379982 })
  longitude?: number;
}
