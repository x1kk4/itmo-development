import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BranchesService {
  constructor(private readonly prisma: PrismaService) {}

  // create(createBranchDto: CreateBranchDto) {
  //   return 'This action adds a new branch';
  // }

  async getManyWithPaginationAndFilters(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const branches = await this.prisma.branch.findMany({
      skip: offset,
      take: limit,
    });

    if (branches.length) {
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
