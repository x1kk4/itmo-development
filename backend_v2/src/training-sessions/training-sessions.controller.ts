import {
  Controller,
  Get,
  Param,
  SerializeOptions,
  Query,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  Post,
} from '@nestjs/common';
import { TrainingSessionsService } from './training-sessions.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { TrainingSessionResponseDto } from './dto/training-session-response.dto';
import { TrainingSessionsFilterDto } from './dto/training-sessions-filter.dto';
import { ScheduleResponseDto } from './dto/schedule-response.dto';
import { ExtendedTrainingSessionResponseDto } from './dto/extended-training-session-response.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Role } from '@prisma/client';

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
      query.userId,
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

  @ApiBearerAuth('access-token')
  @Roles(Role.CHILDREN, Role.PARENT)
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Enroll user to training session',
  })
  @HttpCode(200)
  @Post(':sessionId/enroll/:userId')
  async enroll(
    @Param('sessionId', ParseIntPipe) sessionId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @CurrentUser() requestorId: number,
  ) {
    return this.trainingSessionService.enrollUser(
      sessionId,
      userId,
      requestorId,
    );
  }

  @ApiBearerAuth('access-token')
  @Roles(Role.CHILDREN, Role.PARENT)
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Unenroll user from training session',
  })
  @HttpCode(200)
  @Post(':sessionId/unenroll/:userId')
  async unenroll(
    @Param('sessionId', ParseIntPipe) sessionId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @CurrentUser() requestorId: number,
  ) {
    return this.trainingSessionService.unenrollUser(
      sessionId,
      userId,
      requestorId,
    );
  }

  @ApiBearerAuth('access-token')
  @Roles(Role.COACH)
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: "Mark a user's attendance at a training session",
  })
  @HttpCode(200)
  @Post(':sessionId/attend/:userId')
  async attend(
    @Param('sessionId', ParseIntPipe) sessionId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @CurrentUser() requestorId: number,
  ) {
    return this.trainingSessionService.attendUser(
      sessionId,
      userId,
      requestorId,
    );
  }

  @ApiBearerAuth('access-token')
  @Roles(Role.COACH)
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: "Unmark the user's attendance at the training session",
  })
  @HttpCode(200)
  @Post(':sessionId/unattend/:userId')
  async unattend(
    @Param('sessionId', ParseIntPipe) sessionId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @CurrentUser() requestorId: number,
  ) {
    return this.trainingSessionService.unattendUser(
      sessionId,
      userId,
      requestorId,
    );
  }
}
