import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { AppConfig } from 'src/config';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  private readonly jwtConfig: AppConfig['jwt'];

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<AppConfig>,
  ) {
    this.jwtConfig = this.configService.get('jwt');
  }

  async getManyWithPaginationAndFilters(
    page: number,
    limit: number,
    search: string | undefined,
  ) {
    const offset = (page - 1) * limit;

    const searchFields = [
      'login',
      'phone',
      'email',
      'telegram',
      'firstname',
      'middlename',
      'surname',
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

    const users = await this.prisma.user.findMany({
      skip: offset,
      take: limit,
      where,
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

  async getChildren(id: number) {
    const children = await this.prisma.user.findMany({
      where: {
        childrenRelations: {
          some: {
            parentId: id,
          },
        },
      },
    });

    if (!children.length) {
      throw new NotFoundException('No children found for this user');
    }

    return children;
  }

  async getParents(id: number) {
    const parents = await this.prisma.user.findMany({
      where: {
        parentChildRelations: {
          some: {
            childId: id,
          },
        },
      },
    });

    if (!parents.length) {
      throw new NotFoundException('No parents found for this user');
    }

    return parents;
  }

  async inviteChildren(inviterId: number) {
    const { id: inviteId } = await this.prisma.invite.create({});

    const payload = {
      inviteId,
      inviterId,
      role: Role.CHILDREN,
    };

    return this.jwtService.sign(payload, {
      secret: this.jwtConfig.invite_secret,
      expiresIn: this.jwtConfig.invite_expiration,
    });
  }

  async inviteCoach() {
    const { id: inviteId } = await this.prisma.invite.create({});
    const payload = {
      inviteId,
      inviterId: null,
      role: Role.COACH,
    };

    return this.jwtService.sign(payload, {
      secret: this.jwtConfig.invite_secret,
      expiresIn: this.jwtConfig.invite_expiration,
    });
  }

  async inviteManager() {
    const { id: inviteId } = await this.prisma.invite.create({});

    const payload = {
      inviteId,
      inviterId: null,
      role: Role.MANAGER,
    };

    return this.jwtService.sign(payload, {
      secret: this.jwtConfig.invite_secret,
      expiresIn: this.jwtConfig.invite_expiration,
    });
  }
}
