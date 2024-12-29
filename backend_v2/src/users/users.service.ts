import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(private readonly prisma: PrismaService) {}

  // create(createUserDto: any) {
  //   return 'This action adds a new user';
  // }

  async getManyWithPaginationAndFilters(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const users = await this.prisma.user.findMany({
      skip: offset,
      take: limit,
    });

    if (users.length) {
      return users;
    }

    throw new NotFoundException('Users not found');
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user) {
      return user;
    }

    throw new NotFoundException('User with such id does not exist');
  }

  // update(id: number, updateUserDto: any) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
