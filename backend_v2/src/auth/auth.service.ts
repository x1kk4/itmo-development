import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { SignInRequestDto } from './dto/sign-in/request.dto';
import { SignUpRequestDto } from './dto/sign-up/request.dto';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/config';
import { MinioService } from 'src/minio/minio.service';
import { EditProfileRequestDto } from './dto/edit/request.dto';
import { SignUpByInviteRequestDto } from './dto/sign-up-by-invite/request.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly jwtConfig: AppConfig['jwt'];

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<AppConfig>,
    private readonly minioService: MinioService,
  ) {
    this.jwtConfig = this.configService.get('jwt');
  }

  private async validateUser(data: SignInRequestDto) {
    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: {
          OR: [{ login: data.login }, { email: data.login }],
        },
      });

      const passwordEquals = await bcrypt.compare(data.password, user.password);

      if (passwordEquals) return user;

      throw new UnauthorizedException('Invalid credentials');
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async generateToken(
    data: Partial<User>,
    type: 'access' | 'refresh',
  ): Promise<string> {
    const payload = { login: data.login, id: data.id, role: data.role };

    return this.jwtService.sign(
      { payload, type },
      {
        secret:
          type === 'access'
            ? this.jwtConfig.access_secret
            : this.jwtConfig.refresh_secret,

        expiresIn:
          type === 'access'
            ? this.jwtConfig.access_expiration
            : this.jwtConfig.refresh_expiration,
      },
    );
  }

  async verifyToken(token: string, type: 'access' | 'refresh'): Promise<any> {
    try {
      return this.jwtService.verify(token, {
        secret:
          type === 'access'
            ? this.jwtConfig.access_secret
            : this.jwtConfig.refresh_secret,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async signIn(data: SignInRequestDto) {
    try {
      const user = await this.validateUser(data);

      const [accessToken, refreshToken] = await Promise.all([
        this.generateToken(user, 'access'),
        this.generateToken(user, 'refresh'),
      ]);

      const updatedUser = await this.prisma.user.update({
        where: {
          id: user.id,
        },

        data: {
          refreshToken,
        },
      });

      return {
        accessToken,
        refreshToken,
        user: updatedUser,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      this.logger.error(error);
      throw new BadRequestException();
    }
  }

  async signUp(data: SignUpRequestDto) {
    const candidate = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            login: data.login,
          },
          {
            email: data.email,
          },
        ],
      },
    });

    if (candidate) {
      throw new BadRequestException(
        'User with such login or email already exists',
      );
    }

    const hashPassword = await bcrypt.hash(data.password, 5);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        role: Role.PARENT,
        password: hashPassword,
      },
    });

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(user, 'access'),
      this.generateToken(user, 'refresh'),
    ]);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async signUpByInvite(data: SignUpByInviteRequestDto) {
    let payload: {
      inviteId: number;
      inviterId: number | null;
      role: Role;
    };

    try {
      payload = this.jwtService.verify(data.code, {
        secret: this.jwtConfig.invite_secret,
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Bad invitation code');
    }

    const invitation = await this.prisma.invite.findUnique({
      where: {
        id: payload.inviteId,
      },
    });

    if (invitation.isUsed) {
      throw new BadRequestException('Invitation code already used');
    }

    const candidate = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            login: data.login,
          },
          {
            email: data.email,
          },
        ],
      },
    });

    if (candidate) {
      throw new BadRequestException(
        'User with such login or email already exists',
      );
    }

    let inviter: User;

    if (payload.inviterId) {
      inviter = await this.prisma.user.findUnique({
        where: {
          id: payload.inviterId,
        },
      });
    }

    const hashPassword = await bcrypt.hash(data.password, 5);

    const user = await this.prisma.user.create({
      data: {
        login: data.login,
        email: data.email,
        role: payload.role,
        password: hashPassword,
      },
    });

    if (inviter.role === Role.PARENT && user.role === Role.CHILDREN) {
      await this.prisma.parentChild.create({
        data: {
          parent: {
            connect: { id: inviter.id },
          },
          child: {
            connect: { id: user.id },
          },
        },
      });
    }

    await this.prisma.invite.update({
      where: {
        id: payload.inviteId,
      },
      data: {
        isUsed: true,
      },
    });

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(user, 'access'),
      this.generateToken(user, 'refresh'),
    ]);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async me(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async editProfile(userId: number, data: EditProfileRequestDto) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: data,
    });

    return;
  }

  async editAvatar(userId: number, picture: Express.Multer.File) {
    await this.minioService.createBucketIfNotExists();
    const fileUrl = await this.minioService.uploadFile(picture);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profilePicture: fileUrl,
      },
    });

    return;
  }

  async logout(userId: number): Promise<{ message: string }> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });

    return;
  }
}
