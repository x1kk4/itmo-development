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
