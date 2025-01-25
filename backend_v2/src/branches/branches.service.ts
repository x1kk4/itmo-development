import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { orderByDistance } from 'geolib';
import { Branch } from '@prisma/client';

@Injectable()
export class BranchesService {
  constructor(private readonly prisma: PrismaService) {}

  // create(createBranchDto: CreateBranchDto) {
  //   return 'This action adds a new branch';
  // }

  async getManyWithPaginationAndFilters(
    page: number,
    limit: number,
    latitude?: number,
    longitude?: number,
  ) {
    const offset = (page - 1) * limit;

    let branches: Branch[];

    if (latitude & longitude) {
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

  // update(id: number, updateBranchDto: UpdateBranchDto) {
  //   return `This action updates a #${id} branch`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} branch`;
  // }
}
