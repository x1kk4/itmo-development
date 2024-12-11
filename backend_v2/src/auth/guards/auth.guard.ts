import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { PrismaService } from 'prisma/prisma.service';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly prisma: PrismaService,
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      const req = context.switchToHttp().getRequest();
      const res = context.switchToHttp().getResponse();

      const access = req.headers['Authorization'];
      const refresh = req.headers['Refresh'];

      const accessBearer = access.split(' ')[0];
      const accessToken = access.split(' ')[1];

      let refreshBearer: string;
      let refreshToken: string;

      if (accessBearer === 'Bearer' && accessToken) {
        try {
          const { payload } = await this.authService.verifyToken(
            accessToken,
            'access',
          );

          if (payload.id) {
            if (!requiredRoles) {
              return true;
            }

            return requiredRoles.includes(payload.role);
          }
        } catch (error) {
          this.logger.warn(error);
        }
      }

      try {
        refreshBearer = refresh.split(' ')[0];
        refreshToken = refresh.split(' ')[1];
      } catch (error) {
        throw new ForbiddenException(error);
      }

      if (refreshBearer === 'Bearer' && refreshToken) {
        const { payload } = await this.authService.verifyToken(
          refreshToken,
          'refresh',
        );

        const user = await this.prisma.user.findUnique({
          where: {
            refreshToken,
          },
        });

        if (payload.id && user.refreshToken === refreshToken) {
          const newAccessToken = await this.authService.generateToken(
            payload,
            'access',
          );

          const newRefreshToken = await this.authService.generateToken(
            payload,
            'refresh',
          );

          await this.prisma.user.update({
            where: {
              id: payload.id,
            },

            data: {
              refreshToken: newRefreshToken,
            },
          });

          res.setHeader('access', `Bearer ${newAccessToken}`);
          res.setHeader('refresh', `Bearer ${newRefreshToken}`);

          if (!requiredRoles) {
            return true;
          }

          return requiredRoles.includes(payload.role);
        }

        throw new ForbiddenException('Forbidden');
      }
    } catch (error) {
      this.logger.error(error);
      throw new ForbiddenException('Forbidden');
    }
  }
}
