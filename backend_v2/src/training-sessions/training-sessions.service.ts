import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { TrainingSessionResponseDto } from './dto/training-session-response.dto';
import { ScheduleResponseDto } from './dto/schedule-response.dto';
import { Role } from '@prisma/client';

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
    userId?: number,
  ): Promise<ScheduleResponseDto[]> {
    const offset = (page - 1) * limit;

    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    let trainingSessions = [];

    if (userId) {
      const user = await this.prisma.user
        .findUniqueOrThrow({
          where: {
            id: userId,
          },
        })
        .catch(() => {
          throw new BadRequestException();
        });

      if (user.role === Role.CHILDREN) {
        trainingSessions = await this.prisma.trainingSession.findMany({
          skip: offset,
          take: limit,
          where: {
            enrolled: {
              some: {
                userId,
              },
            },
            startDate: {
              gte: currentDate,
            },
          },
          orderBy: {
            startDate: 'asc',
          },
          include: {
            enrolled: true,
            attendees: true,
            coach: true,
            branch: true,
          },
        });
      }

      if (user.role === Role.COACH) {
        trainingSessions = await this.prisma.trainingSession.findMany({
          skip: offset,
          take: limit,
          where: {
            coachId: userId,
            startDate: {
              gte: currentDate,
            },
          },
          orderBy: {
            startDate: 'asc',
          },
          include: {
            enrolled: true,
            attendees: true,
            coach: true,
            branch: true,
          },
        });
      }

      if (user.role === Role.MANAGER || user.role === Role.SUPER) {
        const branches = await this.prisma.branchesUsers.findMany({
          where: {
            userId,
          },
        });

        trainingSessions = await this.prisma.trainingSession.findMany({
          skip: offset,
          take: limit,
          where: {
            branchId: {
              in: branches.map((branch) => branch.branchId),
            },
            startDate: {
              gte: currentDate,
            },
          },
          orderBy: {
            startDate: 'asc',
          },
          include: {
            enrolled: true,
            attendees: true,
            coach: true,
            branch: true,
          },
        });
      }

      if (user.role === Role.PARENT) {
        const children = await this.prisma.user.findMany({
          where: {
            childrenRelations: {
              some: {
                parentId: userId,
              },
            },
          },
        });

        trainingSessions = await this.prisma.trainingSession.findMany({
          skip: offset,
          take: limit,
          where: {
            enrolled: {
              some: {
                userId: {
                  in: children.map((child) => child.id),
                },
              },
            },
            startDate: {
              gte: currentDate,
            },
          },
          orderBy: {
            startDate: 'asc',
          },
          include: {
            enrolled: true,
            attendees: true,
            coach: true,
            branch: true,
          },
        });
      }
    } else {
      trainingSessions = await this.prisma.trainingSession.findMany({
        skip: offset,
        take: limit,
        where: {
          branchId: branchId && {
            in: typeof branchId === 'number' ? [branchId] : branchId,
          },
          startDate: {
            gte: currentDate,
          },
        },
        orderBy: {
          startDate: 'asc',
        },
        include: {
          enrolled: true,
          attendees: true,
          coach: true,
          branch: true,
        },
      });
    }

    if (!trainingSessions || !trainingSessions.length) {
      throw new NotFoundException('Training sessions not found');
    }

    const structuredTrainingSessions: ScheduleResponseDto[] = [];

    trainingSessions.forEach((session) => {
      const dayDate = new Date(session.startDate);
      dayDate.setUTCHours(0, 0, 0, 0);

      if (
        structuredTrainingSessions.length === 0 ||
        structuredTrainingSessions[
          structuredTrainingSessions.length - 1
        ].date.getTime() !== dayDate.getTime()
      ) {
        structuredTrainingSessions.push({
          date: dayDate,
          data: [session],
        });
      } else {
        structuredTrainingSessions[
          structuredTrainingSessions.length - 1
        ].data.push(session);
      }
    });

    return structuredTrainingSessions;
  }

  async getById(id: number) {
    const trainingSession = await this.prisma.trainingSession.findUnique({
      where: {
        id,
      },
      include: {
        enrolled: {
          include: {
            user: true,
          },
        },
        attendees: {
          include: {
            user: true,
          },
        },
        coach: true,
        branch: true,
      },
    });

    if (trainingSession) {
      return trainingSession;
    }

    throw new NotFoundException('Training session with such id does not exist');
  }

  async enrollUser(sessionId: number, userId: number, requestorId: number) {
    await this.prisma.trainingSession
      .findUniqueOrThrow({
        where: {
          id: sessionId,
        },
      })
      .catch(() => {
        throw new BadRequestException('Incorrect training session id');
      });

    const requestor = await this.prisma.user.findUnique({
      where: {
        id: requestorId,
      },
    });

    if (requestor.role !== Role.PARENT) {
      if (userId !== requestor.id) {
        throw new ForbiddenException('Bad permissions.');
      }

      await this.prisma.enrolledUsers
        .create({
          data: {
            trainingSessionId: sessionId,
            userId,
          },
        })
        .catch(() => {
          throw new BadRequestException('Already enrolled');
        });

      return;
    }

    // PARENT logic
    const requestorChild = await this.prisma.user.findMany({
      where: {
        childrenRelations: {
          some: {
            parentId: requestor.id,
            childId: userId,
          },
        },
      },
    });

    if (requestorChild.length === 0) {
      throw new ForbiddenException('Bad permissions.');
    }

    await this.prisma.enrolledUsers
      .create({
        data: {
          trainingSessionId: sessionId,
          userId,
        },
      })
      .catch(() => {
        throw new BadRequestException('Already enrolled');
      });

    return;
  }

  async unenrollUser(sessionId: number, userId: number, requestorId: number) {
    await this.prisma.trainingSession
      .findUniqueOrThrow({
        where: {
          id: sessionId,
        },
      })
      .catch(() => {
        throw new BadRequestException('Incorrect training session id');
      });

    const requestor = await this.prisma.user.findUnique({
      where: {
        id: requestorId,
      },
    });

    if (requestor.role !== Role.PARENT) {
      if (userId !== requestor.id) {
        throw new ForbiddenException('Bad permissions.');
      }

      const isAttended = Boolean(
        await this.prisma.sessionAttendees.findUnique({
          where: {
            userId_trainingSessionId: {
              trainingSessionId: sessionId,
              userId,
            },
          },
        }),
      );

      if (isAttended) {
        throw new BadRequestException('Already attended');
      }

      await this.prisma.enrolledUsers
        .delete({
          where: {
            userId_trainingSessionId: {
              trainingSessionId: sessionId,
              userId,
            },
          },
        })
        .catch(() => {
          throw new BadRequestException('Not enrolled');
        });

      return;
    }

    // PARENT logic
    const requestorChild = await this.prisma.user.findMany({
      where: {
        childrenRelations: {
          some: {
            parentId: requestor.id,
            childId: userId,
          },
        },
      },
    });

    if (requestorChild.length === 0) {
      throw new ForbiddenException('Bad permissions.');
    }

    const isAttended = Boolean(
      await this.prisma.sessionAttendees.findUnique({
        where: {
          userId_trainingSessionId: {
            trainingSessionId: sessionId,
            userId,
          },
        },
      }),
    );

    if (isAttended) {
      throw new BadRequestException('Already attended');
    }

    await this.prisma.enrolledUsers
      .delete({
        where: {
          userId_trainingSessionId: {
            trainingSessionId: sessionId,
            userId,
          },
        },
      })
      .catch(() => {
        throw new BadRequestException('Not enrolled');
      });

    return;
  }

  async attendUser(sessionId: number, userId: number, requestorId: number) {
    await this.prisma.trainingSession
      .findUniqueOrThrow({
        where: {
          id: sessionId,
        },
      })
      .catch(() => {
        throw new BadRequestException('Incorrect training session id');
      });

    await this.prisma.trainingSession
      .findUniqueOrThrow({
        where: {
          id: sessionId,
          coachId: requestorId,
        },
      })
      .catch(() => {
        throw new ForbiddenException('Bad permissions.');
      });

    await this.prisma.enrolledUsers
      .findUniqueOrThrow({
        where: {
          userId_trainingSessionId: {
            trainingSessionId: sessionId,
            userId,
          },
        },
      })
      .catch(() => {
        throw new BadRequestException('Not enrolled');
      });

    await this.prisma.sessionAttendees
      .create({
        data: {
          trainingSessionId: sessionId,
          userId,
        },
      })
      .catch(() => {
        throw new BadRequestException('Already attended');
      });

    return;
  }

  async unattendUser(sessionId: number, userId: number, requestorId: number) {
    await this.prisma.trainingSession
      .findUniqueOrThrow({
        where: {
          id: sessionId,
        },
      })
      .catch(() => {
        throw new BadRequestException('Incorrect training session id');
      });

    await this.prisma.trainingSession
      .findUniqueOrThrow({
        where: {
          id: sessionId,
          coachId: requestorId,
        },
      })
      .catch(() => {
        throw new ForbiddenException('Bad permissions.');
      });

    await this.prisma.sessionAttendees
      .delete({
        where: {
          userId_trainingSessionId: {
            trainingSessionId: sessionId,
            userId,
          },
        },
      })
      .catch(() => {
        throw new BadRequestException('Already unattended');
      });

    return;
  }
}
