import {
  Controller,
  Get,
  Param,
  SerializeOptions,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { TrainingSessionsService } from './training-sessions.service';
import { ApiResponse } from '@nestjs/swagger';
import { TrainingSessionResponseDto } from './dto/training-session-response.dto';
import { TrainingSessionsFilterDto } from './dto/training-sessions-filter.dto';
import { ScheduleResponseDto } from './dto/schedule-response.dto';
import { ExtendedTrainingSessionResponseDto } from './dto/extended-training-session-response.dto';

@Controller('training-sessions')
export class TrainingSessionsController {
  constructor(
    private readonly trainingSessionService: TrainingSessionsService,
  ) {}

  @ApiResponse({
    status: 200,
    type: [TrainingSessionResponseDto],
    description: 'Training sessions with pagination & filters',
  })
  @SerializeOptions({ type: TrainingSessionResponseDto })
  @Get()
  async getMany(@Query() query: TrainingSessionsFilterDto) {
    return this.trainingSessionService.getManyWithPaginationAndFilters(
      query.page,
      query.limit,
      query.branchId,
    );
  }

  @ApiResponse({
    status: 200,
    type: [ScheduleResponseDto],
    description: 'Training sessions with pagination & filters grouped by days',
  })
  @SerializeOptions({ type: ScheduleResponseDto })
  @Get('/grouped')
  async getManyGrouped(@Query() query: TrainingSessionsFilterDto) {
    return this.trainingSessionService.getGroupedWithPaginationAndFilters(
      query.page,
      query.limit,
      query.branchId,
    );
  }

  @ApiResponse({
    status: 200,
    type: ExtendedTrainingSessionResponseDto,
    description: 'Single training session by id',
  })
  @SerializeOptions({ type: ExtendedTrainingSessionResponseDto })
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.trainingSessionService.getById(id);
  }
}
