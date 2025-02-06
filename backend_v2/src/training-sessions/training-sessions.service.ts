import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { TrainingSessionResponseDto } from './dto/training-session-response.dto';
import { ScheduleResponseDto } from './dto/schedule-response.dto';

import { sortBy } from 'lodash';

@Injectable()
export class TrainingSessionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getManyWithPaginationAndFilters(
    page: number,
    limit: number,
    branchId?: number | number[],
  ): Promise<TrainingSessionResponseDto[]> {
    const offset = (page - 1) * limit;

    const trainingSessions = await this.prisma.trainingSession.findMany({
      skip: offset,
      take: limit,
      where: branchId && {
        branchId: {
          in: typeof branchId === 'number' ? [branchId] : branchId,
        },
      },
    });

    if (trainingSessions && trainingSessions.length) {
      return trainingSessions;
    }

    throw new NotFoundException('Training sessions not found');
  }

  async getGroupedWithPaginationAndFilters(
    page: number,
    limit: number,
    branchId?: number[],
  ): Promise<ScheduleResponseDto[]> {
    const offset = (page - 1) * limit;

    const trainingSessions = await this.prisma.trainingSession.findMany({
      skip: offset,
      take: limit,
      where: {
        branchId: {
          in: typeof branchId === 'number' ? [branchId] : branchId,
        },
      },
    });

    if (!trainingSessions || !trainingSessions.length) {
      throw new NotFoundException('Training sessions not found');
    }

    const sortedByTime = sortBy(
      trainingSessions,
      (session) => session.startDate,
    );

    const structuredSorted: ScheduleResponseDto[] = [];

    sortedByTime.forEach((session) => {
      const dayDate = new Date(session.startDate);
      dayDate.setUTCHours(0, 0, 0, 0);

      if (
        structuredSorted.length === 0 ||
        structuredSorted[structuredSorted.length - 1].date.getTime() !==
          dayDate.getTime()
      ) {
        structuredSorted.push({
          date: dayDate,
          data: [session],
        });
      } else {
        structuredSorted[structuredSorted.length - 1].data.push(session);
      }
    });

    return structuredSorted;
  }

  async getById(id: number) {
    const trainingSession = await this.prisma.trainingSession.findUnique({
      where: {
        id,
      },
    });

    if (trainingSession) {
      return trainingSession;
    }

    throw new NotFoundException('Training session with such id does not exist');
  }
}
