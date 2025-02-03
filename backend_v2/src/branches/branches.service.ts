import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { orderByDistance } from 'geolib';
import { Branch } from '@prisma/client';

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
}
