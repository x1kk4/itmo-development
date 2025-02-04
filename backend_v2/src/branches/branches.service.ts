import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { orderByDistance } from 'geolib';
import { Branch, Role } from '@prisma/client';

@Injectable()
export class BranchesService {
  constructor(private readonly prisma: PrismaService) {}

  async getManyWithPaginationAndFilters(
    page: number,
    limit: number,
    latitude?: number,
    longitude?: number,
    search?: string,
  ) {
    const offset = (page - 1) * limit;

    let branches: Branch[];

    const searchFields = [
      'name',
      'contactPhone',
      'contactEmail',
      'contactTelegram',
    ];

    let where;

    if (search) {
      if (
        search.split(' ').length === 1 &&
        search[0] !== '+' &&
        !isNaN(Number(search))
      ) {
        where = {
          id: Number(search),
        };
      } else {
        where = {
          AND: search.split(' ').map((word) => ({
            OR: searchFields.map((field) => ({
              [field]: {
                contains: word,
                mode: 'insensitive',
              },
            })),
          })),
        };
      }
    }

    if (latitude && longitude && !search) {
      const allBranches = await this.prisma.branch.findMany();

      const ordered = orderByDistance(
        { latitude, longitude },
        allBranches.map((branch) => ({
          latitude: branch.location.split(', ')[0],
          longitude: branch.location.split(', ')[1],
        })),
      );

      branches = ordered
        .map((location: { latitude: string; longitude: string }) =>
          allBranches.find(
            (branch) => location.latitude === branch.location.split(', ')[0],
          ),
        )
        .slice(offset, page * limit);
    } else {
      branches = await this.prisma.branch.findMany({
        skip: offset,
        take: limit,
        where,
      });
    }

    if (branches && branches.length) {
      return branches;
    }

    throw new NotFoundException('Branches not found');
  }

  async findOne(id: number) {
    const branch = await this.prisma.branch.findUnique({
      where: {
        id,
      },
    });

    if (branch) {
      return branch;
    }

    throw new NotFoundException('Branch with such id does not exist');
  }

  async bindUser(branchId: number, userId: number, requestorId: number) {
    await this.prisma.branch
      .findUniqueOrThrow({
        where: {
          id: branchId,
        },
      })
      .catch(() => {
        throw new BadRequestException('Incorrect branch id');
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

      await this.prisma.branchesUsers
        .create({
          data: {
            branchId,
            userId,
          },
        })
        .catch(() => {
          throw new BadRequestException('Already binded');
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

    await this.prisma.branchesUsers
      .create({
        data: {
          branchId,
          userId,
        },
      })
      .catch(() => {
        throw new BadRequestException('Already binded');
      });

    return;
  }

  async unbindUser(branchId: number, userId: number, requestorId: number) {
    await this.prisma.branch
      .findUniqueOrThrow({
        where: {
          id: branchId,
        },
      })
      .catch(() => {
        throw new BadRequestException('Incorrect branch id');
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

      await this.prisma.branchesUsers
        .delete({
          where: {
            userId_branchId: {
              branchId,
              userId,
            },
          },
        })
        .catch(() => {
          throw new BadRequestException("Can't unbind nonexistend bond");
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

    await this.prisma.branchesUsers
      .delete({
        where: {
          userId_branchId: {
            branchId,
            userId,
          },
        },
      })
      .catch(() => {
        throw new BadRequestException('Not binded');
      });

    return;
  }
}
